// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


library Roles {
    struct Role {
        mapping(address => bool) bearer;
    }

    /**
     * @dev give an address access to this role
     */
    function add(Role storage role, address addr) internal {
        role.bearer[addr] = true;
    }

    /**
     * @dev remove an address' access to this role
     */
    function remove(Role storage role, address addr) internal {
        role.bearer[addr] = false;
    }

    /*
     * @dev check if an address has this role
     * // reverts
     */
    function check(Role storage role, address addr) internal view {
        require(has(role, addr));
    }

    /*
     * @dev check if an address has this role
     * @return bool
     */
    function has(Role storage role, address addr) internal view returns (bool) {
        return role.bearer[addr];
    }
}

contract RBAC {
    using Roles for Roles.Role;

    mapping(string => Roles.Role) private roles;

    event RoleAdded(address addr, string roleName);
    event RoleRemoved(address addr, string roleName);

    function checkRole(address addr, string memory roleName) public view {
        roles[roleName].check(addr);
    }

    function hasRole(address addr, string memory roleName)
        public
        view
        returns (bool)
    {
        return roles[roleName].has(addr);
    }

    function addRole(address addr, string memory roleName) public {
        roles[roleName].add(addr);
        emit RoleAdded(addr, roleName);
    }

    function removeRole(address addr, string memory roleName) internal {
        roles[roleName].remove(addr);
        emit RoleRemoved(addr, roleName);
    }


    modifier onlyRole(string memory roleName) {
        checkRole(msg.sender, roleName);
        _;
    }

}


contract Whitelist is RBAC {
    event WhitelistedAddressAdded(address addr, string roleName);
    event WhitelistedAddressRemoved(address addr, string roleName);

    address public owner;
    string public constant FUND_RAISER = "fund_raiser";
    string public constant FUND_CONTRIBUTOR = "fund_contributor";
    string public constant FUND_APPROVER = "fund_approver";

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyFundApprover() {
        checkRole(msg.sender, FUND_APPROVER);
        _;
    }

    modifier onlyFundRaiser() {
        checkRole(msg.sender, FUND_RAISER);
        _;
    }

    modifier onlyFundContributor() {
        checkRole(msg.sender, FUND_CONTRIBUTOR);
        _;
    }

    struct KYCRequest {
        string first_Name;
        string last_Name;
        string email;
        string phone;
        address user_address;
        string docType;
        string role_applied_for;
        string status;
    }

    KYCRequest[] public kycRequests;

    // create KYC requests
    function createKYCRequest(
        string memory _first_name,
        string memory _last_name,
        string memory _email,
        string memory _phone,
        string memory _doctype,
        string memory _role_applied_for
    ) public {
        KYCRequest memory newRequest = KYCRequest(
            _first_name,
            _last_name,
            _email,
            _phone,
            msg.sender,
            _doctype,
            _role_applied_for,
            "Pending"
        );
        kycRequests.push(newRequest);
    }

    // fetch KYC requests
    function fetchKYCRequests() public view returns (KYCRequest[] memory) {
        return (kycRequests);
    }

    // approving the requests
    function approveKYCRequest(address addr, string memory role_applied)
        public onlyFundApprover
    {
        if (
            keccak256(abi.encodePacked((role_applied))) ==
            keccak256(abi.encodePacked((FUND_RAISER)))
        ) {
            addRole(addr, FUND_RAISER);
            emit WhitelistedAddressAdded(addr, FUND_RAISER);
        }
        if (
            keccak256(abi.encodePacked((role_applied))) ==
            keccak256(abi.encodePacked((FUND_CONTRIBUTOR)))
        ) {
            addRole(addr, FUND_CONTRIBUTOR);
            emit WhitelistedAddressAdded(addr, FUND_CONTRIBUTOR);
        }
        updateStatusOfRequest(addr, role_applied, "Approved");
    }

    // reject KYC request
    function rejectKYCRequest(address addr, string memory role_applied) public onlyFundApprover {
        updateStatusOfRequest(addr, role_applied, "Rejected");
    }

    // update status of the KYC requests
    function updateStatusOfRequest(
        address addr,
        string memory role_applied,
        string memory status
    ) internal {
        uint256 len = kycRequests.length;
        for (uint256 i = 0; i < len; i++) {
            if (
                kycRequests[i].user_address == addr &&
                keccak256(
                    abi.encodePacked((kycRequests[i].role_applied_for))
                ) ==
                keccak256(abi.encodePacked((role_applied)))
            ) {
                kycRequests[i].status = status;
            }
        }
    }


    function addAddressToFundRaiser(address addr) public onlyOwner {
        addRole(addr, FUND_RAISER);
        emit WhitelistedAddressAdded(addr, FUND_RAISER);
    }

    function addAddressToFundApprover(address addr) public onlyOwner {
        addRole(addr, FUND_APPROVER);
        emit WhitelistedAddressAdded(addr, FUND_APPROVER);
    }

    function addAddressToFundContributor(address addr) public onlyOwner {
        addRole(addr, FUND_CONTRIBUTOR);
        emit WhitelistedAddressAdded(addr, FUND_CONTRIBUTOR);
    }

    function isFundApprover(address addr) public view returns (bool) {
        return hasRole(addr, FUND_APPROVER);
    }

    function isFundRaiser(address addr) public view returns (bool) {
        return hasRole(addr, FUND_RAISER);
    }

    function isFundContributor(address addr) public view returns (bool) {
        return hasRole(addr, FUND_CONTRIBUTOR);
    }

    function removeAddressFromFundApprover(address addr) public onlyOwner {
        removeRole(addr, FUND_APPROVER);
        emit WhitelistedAddressRemoved(addr, FUND_APPROVER);
    }

    function removeAddressFromFundRaiser(address addr) public onlyOwner {
        removeRole(addr, FUND_RAISER);
        emit WhitelistedAddressRemoved(addr, FUND_RAISER);
    }

    function removeAddressFromFundContributor(address addr) public onlyOwner {
        removeRole(addr, FUND_CONTRIBUTOR);
        emit WhitelistedAddressRemoved(addr, FUND_CONTRIBUTOR);
    }

    string[] user_roles;
    function getRolesOfUser(address addr) public returns(string[] memory) {
        user_roles = new string[](0);
        if(hasRole(addr, FUND_CONTRIBUTOR)){
          user_roles.push(FUND_CONTRIBUTOR);
        }
        if(hasRole(addr, FUND_RAISER)){
          user_roles.push(FUND_RAISER);
        }
        if(hasRole(addr, FUND_APPROVER)){
          user_roles.push(FUND_APPROVER);
        }
        return user_roles;
    }
}

contract CampaignFactory {

      struct CampaignSummary {
        uint256 minimunContribution;
        uint256 balance;
        address manager;
        string CampaignName;
        string  CampaignDescription;
        string imageUrl;
        uint256 targetToAchieve;
    }

    Whitelist whitelist = Whitelist(0x5B5bd06a1fd504651E34D86100774B7627bd4413);
    address[] public deployedCampaigns;

    modifier onlyFundRaiser() {
        require(whitelist.hasRole(msg.sender, "fund_raiser"));
        _;
    }

    function createCampaign(
        uint256 minimum,
        string memory name,
        string memory description,
        string memory image,
        uint256 target
    ) public onlyFundRaiser {
        address newCampaign = address(
            new Campaign(minimum, msg.sender, name, description, image, target)
        );
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

}

contract Campaign {
    Whitelist whitelist = Whitelist(0x5B5bd06a1fd504651E34D86100774B7627bd4413);
    modifier onlyFundContributor() {
        require(whitelist.hasRole(msg.sender, "fund_contributor"));
        _;
    }

    address public manager;
    uint256 public minimunContribution;
    enum Campaign_Status {
        Active,
        Closed
    }

    Campaign_Status public status;
    string public CampaignName;
    string public CampaignDescription;
    string public imageUrl;
    uint256 public balance;
    uint256 public targetToAchieve;
    address[] public contributers;


    event CreatorPaid(address);

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(
        uint256 minimun,
        address creator,
        string memory name,
        string memory description,
        string memory image,
        uint256 target
    ) {
        manager = creator;
        minimunContribution = minimun;
        CampaignName = name;
        CampaignDescription = description;
        imageUrl = image;
        targetToAchieve = target;
        balance = 0;
        status = Campaign_Status.Active;
    }

    function contribute() public payable onlyFundContributor {
        require(msg.value > minimunContribution);
        require((address(this).balance + msg.value) <= targetToAchieve);
        payOut(address(this).balance, manager);
    }

    // payout if the ballance is reached to target balance
    function payOut(uint256 bal, address addr) internal {
        if (bal == targetToAchieve) {
            payable(addr).transfer(targetToAchieve);
            emit CreatorPaid(addr);
            status = Campaign_Status.Closed;
        }
    }

      struct Summary {
        uint256 minimunContribution;
        uint256 balance;
        address manager;
        string CampaignName;
        string  CampaignDescription;
        string imageUrl;
        uint256 targetToAchieve;
    }

    function getSummary()
        public
        view
        returns ( uint256,
        uint256,
        address,
        string memory,
        string memory,
        string memory,
        uint256 
        )
    {
        return (
            minimunContribution,
            address(this).balance,
            manager,
            CampaignName,
            CampaignDescription,
            imageUrl,
            targetToAchieve
        );
    }

}
