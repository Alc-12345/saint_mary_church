
export function buildFundingCampaigns(campaigns = [], donations = []) {
  const verifiedTotals = donations
    .filter((donation) => donation.status === "Verified")
    .reduce((totals, donation) => {
      const purpose = donation.purpose || "General Donation";
      totals[purpose] = (totals[purpose] || 0) + Number(donation.amount || 0);
      return totals;
    }, {});
    
  return campaigns.map((campaign, index) => ({
    ...campaign,
    id: campaign.id || campaign._id || `campaign-${index + 1}`,
    raisedAmount:
      verifiedTotals[campaign.purpose] ?? Number(campaign.raisedAmount || 0),
  }));
}
