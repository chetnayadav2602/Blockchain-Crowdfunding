// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// @dev As this is purely a test to deploy a smart contract to my private network, I'm using code directly from the Open Zeppelin,
// open-source project. This is community vetted code that is publicly available for reuse. 

library Roles {
  struct Role {
    mapping (address => bool) bearer;
  }

  /**
   * @dev give an address access to this role
   */
  function add(Role storage role, address addr)
    internal
  {
    role.bearer[addr] = true;
  }

  /**
   * @dev remove an address' access to this role
   */
  function remove(Role storage role, address addr)
    internal
  {
    role.bearer[addr] = false;
  }

  /*
   * @dev check if an address has this role
   * // reverts
   */
  function check(Role storage role, address addr)
    view
    internal
  {
    require(has(role, addr));
  }

  /*
   * @dev check if an address has this role
   * @return bool
   */
  function has(Role storage role, address addr)
    view
    internal
    returns (bool)
  {
    return role.bearer[addr];
  }
}

contract RBAC {
  using Roles for Roles.Role;

  mapping (string => Roles.Role) private roles;

  event RoleAdded(address addr, string roleName);
  event RoleRemoved(address addr, string roleName);

  /*
   * @dev reverts if addr does not have role
   * @param addr address
   * @param roleName the name of the role
   * // reverts
   */
  function checkRole(address addr, string memory roleName)
    view
    public
  {
    roles[roleName].check(addr);
  }

  /*
   * @dev determine if addr has role
   * @param addr address
   * @param roleName the name of the role
   * @return bool
   */
  function hasRole(address addr, string memory roleName)
    view
    public
    returns (bool)
  {
    return roles[roleName].has(addr);
  }
  
  /**
   * @dev add a role to an address
   * @param addr address
   * @param roleName the name of the role
   */
  function addRole(address addr, string memory roleName)
    public
  {
    roles[roleName].add(addr);
    emit RoleAdded(addr, roleName);
  }

  /**
   * @dev remove a role from an address
   * @param addr address
   * @param roleName the name of the role
   */
  function removeRole(address addr, string memory roleName)
    internal
  {
    roles[roleName].remove(addr);
    emit RoleRemoved(addr, roleName);
  }

  /**
   * @dev modifier to scope access to a single role (uses msg.sender as addr)
   * @param roleName the name of the role
   * // reverts
   */
  modifier onlyRole(string memory roleName)
  {
    checkRole(msg.sender, roleName);
    _;
  }

  /**
   * @dev modifier to scope access to a set of roles (uses msg.sender as addr)
   * @param roleNames the names of the roles to scope access to
   * // reverts
   *
   * @TODO - when solidity supports dynamic arrays as arguments to modifiers, provide this
   *  see: https://github.com/ethereum/solidity/issues/2467
   */
  // modifier onlyRoles(string[] roleNames) {
  //     bool hasAnyRole = false;
  //     for (uint8 i = 0; i < roleNames.length; i++) {
  //         if (hasRole(msg.sender, roleNames[i])) {
  //             hasAnyRole = true;
  //             break;
  //         }
  //     }

  //     require(hasAnyRole);

  //     _;
  // }
}

contract Ownable {
  address public owner;


  event OwnershipRenounced(address indexed previousOwner);
  event OwnershipTransferred(
    address indexed previousOwner,
    address indexed newOwner
  );


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Allows the current owner to relinquish control of the contract.
   * @notice Renouncing to ownership will leave the contract without an owner.
   * It will not be possible to call the functions with the `onlyOwner`
   * modifier anymore.
   */
  function renounceOwnership() public onlyOwner {
    emit OwnershipRenounced(owner);
    owner = address(0);
  }

  /*
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function transferOwnership(address _newOwner) public onlyOwner {
    _transferOwnership(_newOwner);
  }

  /*
   * @dev Transfers control of the contract to a newOwner.
   * @param _newOwner The address to transfer ownership to.
   */
  function _transferOwnership(address _newOwner) internal {
    require(_newOwner != address(0));
    emit OwnershipTransferred(owner, _newOwner);
    owner = _newOwner;
  }
}

contract Whitelist is Ownable, RBAC {
  event WhitelistedAddressAdded(address addr, string roleName);
  event WhitelistedAddressRemoved(address addr, string roleName);

  string public constant FUND_RAISER = "fund_raiser";
  string public constant FUND_CONTRIBUTOR = "fund_contributor";

  /**
   * @dev Throws if called by any account that's not whitelisted.
   */
  modifier onlyFundRaiser() {
    checkRole(msg.sender, FUND_RAISER);
    _;
  }

  modifier onlyFundContributor() {
    checkRole(msg.sender, FUND_CONTRIBUTOR);
    _;
  }

  /*
   * @dev add an address to the whitelist
   * @param addr address
   * @return true if the address was added to the whitelist, false if the address was already in the whitelist
   */
  function addAddressToFundRaiser(address addr)
    onlyOwner
    public
  {
    addRole(addr, FUND_RAISER);
    emit WhitelistedAddressAdded(addr, FUND_RAISER);
  }

  function addAddressToFundContributor(address addr)
    onlyOwner
    public
  {
    addRole(addr, FUND_CONTRIBUTOR);
    emit WhitelistedAddressAdded(addr, FUND_CONTRIBUTOR);
  }

//   /**
//    * @dev getter to determine if address is in whitelist
//    */
  function isFundRaiser(address addr)
    public
    view
    returns (bool)
  {
    return hasRole(addr, FUND_RAISER);
  }

//    /**
//    * @dev getter to determine if address is in whitelist
//    */
  function isFundContributor(address addr)
    public
    view
    returns (bool)
  {
    return hasRole(addr, FUND_CONTRIBUTOR);
  }

  /*
   * @dev remove an address from the whitelist
   * @param addr address
   * @return true if the address was removed from the whitelist,
   * false if the address wasn't in the whitelist in the first place
   */
  function removeAddressFromFundRaiser(address addr)
    onlyOwner
    public
  {
    removeRole(addr, FUND_RAISER);
    emit WhitelistedAddressRemoved(addr, FUND_RAISER);
  }

   /*
   * @dev remove an address from the whitelist
   * @param addr address
   * @return true if the address was removed from the whitelist,
   * false if the address wasn't in the whitelist in the first place
   */
  function removeAddressFromFundContributor(address addr)
    onlyOwner
    public
  {
    removeRole(addr, FUND_CONTRIBUTOR);
    emit WhitelistedAddressRemoved(addr, FUND_CONTRIBUTOR);
  }
}

contract CampaignFactory {
    Whitelist whitelist = Whitelist(0xE9a599ab37eB09cC29100C0d049Bc3cD08126Ddc);

    address[] public deployedCampaigns;

    modifier onlyFundRaiser() {
        require(whitelist.hasRole(msg.sender,"fund_raiser"));
        _;
    }

    function createCampaign(uint minimum,string memory name,string memory description,string memory image,uint target) public onlyFundRaiser {
        address newCampaign = address(new Campaign(minimum, msg.sender,name,description,image,target));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
  struct Request {
      string description;
      uint value;
      address recipient;
      bool complete;
      uint approvalCount;
      mapping(address => bool) approvals;
  }

  Request[] public requests;
  address public manager;
  uint public minimunContribution;
  string public CampaignName;
  string public CampaignDescription;
  string public imageUrl;
  uint public targetToAchieve;
  address[] public contributers;
  mapping(address => bool) public approvers;
  uint public approversCount;
  uint numRequests;
  mapping (uint => Request) requestsMapping;


  modifier restricted() {
      require(msg.sender == manager);
      _;
  }

  constructor (uint minimun, address creator,string memory name,string memory description,string memory image,uint target) {
      manager = creator;
      minimunContribution = minimun;
      CampaignName=name;
      CampaignDescription=description;
      imageUrl=image;
      targetToAchieve=target;
  }

  function contribute() public payable {
      require(msg.value > minimunContribution );

      contributers.push(msg.sender);
      approvers[msg.sender] = true;
      approversCount++;
  }

  function createRequest (string memory description, uint value,
        address recipient) public{
            Request storage r = requestsMapping[numRequests++];
            r.description = description;
            r.value = value;
            r.recipient = recipient;
            r.complete = false;
            r.approvalCount = 0;
  }

  function approveRequest(uint index) public {
      require(approvers[msg.sender]);
      require(!requests[index].approvals[msg.sender]);

      requests[index].approvals[msg.sender] = true;
      requests[index].approvalCount++;
  }

//   function finalizeRequest(uint index) public restricted{
//       require(requests[index].approvalCount > (approversCount / 2));
//       require(!requests[index].complete);

//       requests[index].recipient.transfer(requests[index].value);
//       requests[index].complete = true;

//   }

    function getSummary() public view returns (uint,uint,uint,uint,address,string memory ,string memory,string memory,uint) {
        return(
            minimunContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            CampaignName,
            CampaignDescription,
            imageUrl,
            targetToAchieve
          );
    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
}