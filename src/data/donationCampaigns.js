export const donationCampaigns = [
  {
    id: "general-donation",
    purpose: "General Donation",
    title: "General Care Fund",
    description:
      "Daily church care, utilities, congregation support, and essential ministry needs.",
    targetAmount: 300000,
    raisedAmount: 128000,
    accentColor: "#c89b5a",
  },
  {
    id: "restoration-work",
    purpose: "Restoration Work",
    title: "Restoration Work",
    description:
      "Structural repair, roof recovery, woodwork renewal, and heritage restoration after the fire.",
    targetAmount: 500000,
    raisedAmount: 312000,
    accentColor: "#d8b26e",
  },
  {
    id: "emergency-support",
    purpose: "Emergency Support",
    title: "Emergency Support",
    description:
      "Urgent safety fixes, temporary protection, electrical work, and immediate response expenses.",
    targetAmount: 200000,
    raisedAmount: 84000,
    accentColor: "#b77a52",
  },
  {
    id: "prayer-offering",
    purpose: "Prayer Offering",
    title: "Prayer Offering",
    description:
      "Special offerings for prayer services, memorial gatherings, and faith-centered community care.",
    targetAmount: 150000,
    raisedAmount: 96000,
    accentColor: "#9f7d49",
  },
];

export function buildFundingCampaigns(campaigns = donationCampaigns, donations = []) {
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
