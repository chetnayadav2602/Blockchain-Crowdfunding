export class PostCampaign {

    public campaignName: string;
    public campaignDesc: string;
    public image: String;
    

    constructor(campaignName: string, campaignDesc: string, image: string) {
        this.campaignName = campaignName;
        this.campaignDesc = campaignDesc;
        this.image = image;
    }
}
