import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import churchHome from "../assets/church-home.avif";
import { donationCampaigns as defaultDonationCampaigns } from "../data/donationCampaigns";
import { clearAdminToken } from "../lib/adminAuth";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../lib/api";
import { defaultSiteSettings, mergeSiteSettings } from "../lib/siteSettings";
import {
  isValidEmailAddress,
  isValidPhoneNumber,
  sanitizePhoneInput,
} from "../lib/validation";

const navItems = [
  "Overview",
  "Donations",
  "Gallery",
  "Restoration",
  "Documents",
  "Settings",
];

const initialGalleryItems = [
  { title: "Before Fire Hero", type: "Video", section: "Before Fire" },
  { title: "After Fire Gallery 12", type: "Image", section: "After Fire" },
  { title: "Drone Exterior", type: "Image", section: "Before Fire" },
];

const initialUpdates = [
  { title: "Canopy protection installed", status: "Published" },
  { title: "Youth gazebo progress", status: "Draft" },
];

const initialDocuments = [
  { title: "INTACH Preliminary Report", type: "PDF" },
  { title: "Diocese Appeal Letter", type: "Letter" },
];

const MAX_IMAGE_UPLOAD_SIZE = 4 * 1024 * 1024;
const MAX_DOCUMENT_UPLOAD_SIZE = 15 * 1024 * 1024;

function sortByCreatedAtDesc(items = []) {
  return [...items].sort((first, second) => {
    const firstTime = new Date(
      first?.publishedAt || first?.updatedAt || first?.createdAt || 0,
    ).getTime();
    const secondTime = new Date(
      second?.publishedAt || second?.updatedAt || second?.createdAt || 0,
    ).getTime();
    return secondTime - firstTime;
  });
}

function formatCurrency(amount) {
  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function formatDateTime(value) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("Overview");
  const [donations, setDonations] = useState([]);
  const [galleryItems, setGalleryItems] = useState(initialGalleryItems);
  const [updates, setUpdates] = useState(initialUpdates);
  const [documents, setDocuments] = useState(initialDocuments);
  const [campaigns, setCampaigns] = useState(defaultDonationCampaigns);
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);
  const [siteSettingsDraft, setSiteSettingsDraft] = useState(defaultSiteSettings);
  
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [settingsError, setSettingsError] = useState("");
  const [donationError, setDonationError] = useState("");
  const [selectedDonationId, setSelectedDonationId] = useState("");
  const [simpleInput, setSimpleInput] = useState("");
  const [donationForm, setDonationForm] = useState({
    donor: "",
    email: "",
    phone: "",
    amount: "",
    purpose: "General Donation",
    mode: "UPI",
  });
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    type: "Image",
    section: "Before Fire",
    imageUrl: "",
  });
  const [galleryError, setGalleryError] = useState("");
  const [restorationForm, setRestorationForm] = useState({
    title: "",
    description: "",
    status: "Draft",
    imageUrls: [],
  });
  const [restorationError, setRestorationError] = useState("");
  const [documentForm, setDocumentForm] = useState({
    title: "",
    description: "",
    type: "PDF",
    fileUrl: "",
    content: "",
  });
  const [documentError, setDocumentError] = useState("");
  const [campaignForm, setCampaignForm] = useState({
    id: "",
    purpose: "General Donation",
    title: "",
    description: "",
    targetAmount: "",
    accentColor: "#c89b5a",
  });

  const overviewCards = useMemo(() => {
    const totalAmount = donations.reduce((sum, item) => sum + item.amount, 0);
    return [
      {
        label: "Total Donations",
        value: formatCurrency(totalAmount),
        note: `${donations.length} donor records`,
      },
      {
        label: "Pending Receipts",
        value: String(
          donations.filter((item) => item.status !== "Verified").length,
        ),
        note: "Need review",
      },
      {
        label: "Active Updates",
        value: String(galleryItems.length + documents.length),
        note: "Gallery + Docs",
      },
    ];
  }, [donations, galleryItems, documents]);

  function getDonationKey(item) {
    return item._id || `${item.donor}-${item.createdAt || item.amount}`;
  }

  useEffect(() => {
    async function loadAdminData() {
      const results = await Promise.allSettled([
        apiGet("/donations"),
        apiGet("/donation-campaigns"),
        apiGet("/gallery"),
        apiGet("/restoration"),
        apiGet("/documents"),
        apiGet("/settings"),
      ]);

      const [
        donationsResult,
        campaignsResult,
        galleryResult,
        restorationResult,
        documentsResult,
        settingsResult,
      ] = results;

      if (donationsResult.status === "fulfilled") {
        setDonations(donationsResult.value.data || []);
      } else {
        console.error("Unable to load donations:", donationsResult.reason);
      }

      if (campaignsResult.status === "fulfilled") {
        const nextCampaigns = campaignsResult.value.data || defaultDonationCampaigns;
        setCampaigns(nextCampaigns);
        setDonationForm((current) => ({
          ...current,
          purpose: nextCampaigns[0]?.purpose || current.purpose,
        }));
      } else {
        console.error("Unable to load donation campaigns:", campaignsResult.reason);
      }

      if (galleryResult.status === "fulfilled") {
        setGalleryItems(galleryResult.value.data || []);
      } else {
        console.error("Unable to load gallery items:", galleryResult.reason);
      }

      if (restorationResult.status === "fulfilled") {
        setUpdates(sortByCreatedAtDesc(restorationResult.value.data || []));
      } else {
        console.error("Unable to load restoration updates:", restorationResult.reason);
      }

      if (documentsResult.status === "fulfilled") {
        setDocuments(documentsResult.value.data || []);
      } else {
        console.error("Unable to load document records:", documentsResult.reason);
      }

      if (settingsResult.status === "fulfilled") {
        const nextSiteSettings = mergeSiteSettings(settingsResult.value.data);
        setSiteSettings(nextSiteSettings);
        setSiteSettingsDraft(nextSiteSettings);
      } else {
        console.error("Unable to load site settings:", settingsResult.reason);
      }
    }

    loadAdminData();
  }, []);

  function card(label, value, note) {
    return (
      <div
        key={label}
        className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-[10px]"
      >
        <p className="text-[0.76rem] uppercase tracking-[0.26em] text-[#ead7a3]">
          {label}
        </p>
        <p className="mt-4 font-sans text-[2rem] font-semibold text-white">
          {value}
        </p>
        <p className="mt-2 text-sm text-white/62">{note}</p>
      </div>
    );
  }

  function shell(eyebrow, title, content, action) {
    return (
      <div className="rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-5 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-[10px] md:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.78rem] uppercase tracking-[0.32em] text-[#ead7a3]">
              {eyebrow}
            </p>
            <h3 className="mt-3 font-serif text-[2rem]">{title}</h3>
          </div>
          {action}
        </div>
        <div className="mt-6">{content}</div>
      </div>
    );
  }

  function handleDonationChange(event) {
    const { name, value } = event.target;
    setDonationForm((current) => ({
      ...current,
      [name]: name === "phone" ? sanitizePhoneInput(value) : value,
    }));
    setDonationError("");
  }

  function handleGalleryChange(event) {
    const { name, value } = event.target;
    setGalleryForm((current) => {
      if (name === "type") {
        return { ...current, type: value, imageUrl: "" };
      }

      return { ...current, [name]: value };
    });

    if (name === "type") {
      setGalleryError("");
    }
  }

  function handleDocumentChange(event) {
    const { name, value } = event.target;
    setDocumentForm((current) => {
      if (name === "type") {
        return {
          ...current,
          type: value,
          fileUrl: "",
          content: "",
        };
      }

      return { ...current, [name]: value };
    });
    setDocumentError("");
  }

  function handleDocumentFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setDocumentForm((current) => ({ ...current, fileUrl: "" }));
      setDocumentError("");
      return;
    }

    if (file.size > MAX_DOCUMENT_UPLOAD_SIZE) {
      setDocumentForm((current) => ({ ...current, fileUrl: "" }));
      setDocumentError("Please choose a PDF smaller than 15 MB.");
      return;
    }

    setDocumentError("");
    const reader = new FileReader();
    reader.onload = () => {
      setDocumentForm((current) => ({
        ...current,
        fileUrl: typeof reader.result === "string" ? reader.result : "",
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleCampaignChange(event) {
    const { name, value } = event.target;
    setCampaignForm((current) => ({ ...current, [name]: value }));
  }

  function editCampaign(campaign) {
    setCampaignForm({
      id: campaign._id || "",
      purpose: campaign.purpose,
      title: campaign.title,
      description: campaign.description || "",
      targetAmount: String(campaign.targetAmount || ""),
      accentColor: campaign.accentColor || "#c89b5a",
    });
  }

  function handleGalleryFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      setGalleryForm((current) => ({ ...current, imageUrl: "" }));
      setGalleryError("");
      return;
    }

    const isVideoUpload = galleryForm.type === "Video";

    if (file.size > MAX_IMAGE_UPLOAD_SIZE) {
      setGalleryForm((current) => ({ ...current, imageUrl: "" }));
      setGalleryError(
        isVideoUpload
          ? "Please choose a video smaller than 4 MB."
          : "Please choose an image smaller than 4 MB.",
      );
      return;
    }

    setGalleryError("");
    const reader = new FileReader();
    reader.onload = () => {
      setGalleryForm((current) => ({
        ...current,
        imageUrl: typeof reader.result === "string" ? reader.result : "",
      }));
    };
    reader.readAsDataURL(file);
  }

  function handleRestorationChange(event) {
    const { name, value } = event.target;
    setRestorationForm((current) => ({ ...current, [name]: value }));
  }

  function handleRestorationFileChange(event) {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      setRestorationError("");
      return;
    }

    if (files.some((file) => file.size > MAX_IMAGE_UPLOAD_SIZE)) {
      setRestorationError("Please choose an image smaller than 4 MB.");
      return;
    }

    setRestorationError("");
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () =>
              resolve(typeof reader.result === "string" ? reader.result : "");
            reader.onerror = () => reject(new Error("Unable to read file."));
            reader.readAsDataURL(file);
          }),
      ),
    )
      .then((imageUrls) => {
        setRestorationForm((current) => ({
          ...current,
          imageUrls: [...current.imageUrls, ...imageUrls.filter(Boolean)],
        }));
        event.target.value = "";
      })
      .catch(() => {
        setRestorationError("Unable to read selected images. Please try again.");
      });
  }

  // Admin creation and deletion handlers removed.
  // Only the default/login admin is used for dashboard access.

  async function addDonation() {
    if (!donationForm.donor.trim()) {
      setDonationError("Please enter donor name.");
      return;
    }

    if (donationForm.email && !isValidEmailAddress(donationForm.email)) {
      setDonationError("Please enter a valid email address.");
      return;
    }

    if (!donationForm.amount || Number(donationForm.amount) <= 0) {
      setDonationError("Please enter a valid donation amount.");
      return;
    }

    try {
      const payload = {
        donor: donationForm.donor.trim(),
        email: donationForm.email?.trim() || undefined,
        phone: donationForm.phone || undefined,
        amount: Number(donationForm.amount),
        purpose: donationForm.purpose || (campaigns[0] && campaigns[0].purpose) || "General Donation",
        mode: donationForm.mode || "UPI",
      };

      const response = await apiPost("/donations", payload);

      setDonations((current) => [response.data, ...current]);
      setDonationForm({
        donor: "",
        email: "",
        phone: "",
        amount: "",
        purpose: campaigns[0]?.purpose || "General Donation",
        mode: "UPI",
      });
      setDonationError("");
    } catch (error) {
      setDonationError("Unable to create donation right now. Please try again.");
      console.error("Unable to create donation:", error);
    }
  }

  async function saveCampaign() {
    if (
      !campaignForm.purpose.trim() ||
      !campaignForm.title.trim() ||
      !campaignForm.targetAmount
    ) {
      return;
    }

    const payload = {
      purpose: campaignForm.purpose.trim(),
      title: campaignForm.title.trim(),
      description: campaignForm.description.trim(),
      targetAmount: Number(campaignForm.targetAmount),
      accentColor: campaignForm.accentColor,
    };

    try {
      const response = campaignForm.id
        ? await apiPut(`/donation-campaigns/${campaignForm.id}`, payload)
        : await apiPost("/donation-campaigns", payload);

      setCampaigns((current) => {
        if (campaignForm.id) {
          return current.map((campaign) =>
            campaign._id === campaignForm.id ? response.data : campaign,
          );
        }

        return [...current, response.data];
      });

      setCampaignForm({
        id: "",
        purpose: campaigns[0]?.purpose || "General Donation",
        title: "",
        description: "",
        targetAmount: "",
        accentColor: "#c89b5a",
      });
    } catch (error) {
      console.error("Unable to save donation campaign:", error);
    }
  }

  async function deleteCampaign(campaign) {
    if (!campaign?._id) return;

    try {
      await apiDelete(`/donation-campaigns/${campaign._id}`);

      setCampaigns((current) =>
        current.filter((item) => item._id !== campaign._id),
      );

      if (campaignForm.id === campaign._id) {
        setCampaignForm({
          id: "",
          purpose: "General Donation",
          title: "",
          description: "",
          targetAmount: "",
          accentColor: "#c89b5a",
        });
      }
    } catch (error) {
      console.error("Unable to delete donation campaign:", error);
    }
  }

  async function addGalleryItem() {
    if (!galleryForm.title.trim()) return;
    if (!galleryForm.imageUrl) return;

    try {
      const response = await apiPost("/gallery", {
        title: galleryForm.title.trim(),
        type: galleryForm.type,
        section: galleryForm.section,
        imageUrl: galleryForm.imageUrl,
      });

      setGalleryItems((current) => [response.data, ...current]);
      setGalleryForm({
        title: "",
        type: "Image",
        section: "Before Fire",
        imageUrl: "",
      });
      setGalleryError("");
    } catch (error) {
      setGalleryError("Unable to save gallery item. Please try a smaller image.");
      console.error("Unable to create gallery item:", error);
    }
  }

  async function addRestorationUpdate() {
    if (!restorationForm.title.trim()) return;

    try {
      const response = await apiPost("/restoration", {
        title: restorationForm.title.trim(),
        description: restorationForm.description.trim(),
        status: "Draft",
        imageUrls: restorationForm.imageUrls,
      });

      setUpdates((current) => sortByCreatedAtDesc([response.data, ...current]));
      setRestorationForm({
        title: "",
        description: "",
        status: "Draft",
        imageUrls: [],
      });
      setRestorationError("");
    } catch (error) {
      setRestorationError(
        "Unable to save restoration update. Please try a smaller image.",
      );
      console.error("Unable to create restoration update:", error);
    }
  }

  async function addDocument() {
    if (!documentForm.title.trim()) return;
    if (!documentForm.fileUrl) {
      setDocumentError("Please choose a PDF file before adding the document.");
      return;
    }

    try {
      const response = await apiPost("/documents", {
        title: documentForm.title.trim(),
        description: documentForm.description.trim(),
        type: documentForm.type,
        fileUrl: documentForm.fileUrl,
        content: "",
      });

      setDocuments((current) => [response.data, ...current]);
      setDocumentForm({
        title: "",
        description: "",
        type: "PDF",
        fileUrl: "",
        content: "",
      });
      setDocumentError("");
    } catch (error) {
      setDocumentError("Unable to create document. Please try again.");
      console.error("Unable to create document:", error);
    }
  }

  async function deleteRestorationUpdate(updateId) {
    if (!updateId) return;

    try {
      await apiDelete(`/restoration/${updateId}`);
      setUpdates((current) => current.filter((item) => item._id !== updateId));
    } catch (error) {
      console.error("Unable to delete restoration update:", error);
    }
  }

  async function deleteDocumentItem(documentId) {
    if (!documentId) return;

    try {
      await apiDelete(`/documents/${documentId}`);
      setDocuments((current) => current.filter((item) => item._id !== documentId));
    } catch (error) {
      console.error("Unable to delete document:", error);
    }
  }

  async function addSimple(listSetter, factory, path) {
    if (!simpleInput.trim()) return;

    try {
      const payload = factory(simpleInput.trim());
      const response = await apiPost(path, payload);
      listSetter((current) => [response.data, ...current]);
      setSimpleInput("");
    } catch (error) {
      console.error(`Unable to create record for ${path}:`, error);
    }
  }

  function updateSetting(event) {
    const { name, value } = event.target;
    setSiteSettingsDraft((current) => ({
      ...current,
      [name]: name === "donationPhone" ? sanitizePhoneInput(value) : value,
    }));
    setSettingsError("");
  }

  // Admin form handlers removed; admin management disabled in dashboard.

  function startSettingsEdit() {
    setSiteSettingsDraft(siteSettings);
    setSettingsError("");
    setIsEditingSettings(true);
  }

  function cancelSettingsEdit() {
    setSiteSettingsDraft(siteSettings);
    setSettingsError("");
    setIsEditingSettings(false);
  }

  async function saveSettings() {
    if (!isValidEmailAddress(siteSettingsDraft.churchEmail)) {
      setSettingsError("Please enter a valid church email address.");
      return;
    }
    if (!isValidPhoneNumber(siteSettingsDraft.donationPhone)) {
      setSettingsError("Donation phone must be exactly 10 digits.");
      return;
    }

    try {
      const response = await apiPut("/settings", siteSettingsDraft);
      const nextSiteSettings = mergeSiteSettings(response.data);
      setSiteSettings(nextSiteSettings);
      setSiteSettingsDraft(nextSiteSettings);
      setSettingsError("");
      setIsEditingSettings(false);
    } catch (error) {
      setSettingsError("Unable to save settings right now. Please try again.");
      console.error("Unable to update settings:", error);
    }
  }

  // Admin create/delete API handlers removed.

  function renderOverview() {
    return (
      <>
        <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(18,14,12,0.84),rgba(18,14,12,0.6))] px-6 py-8 shadow-[0_28px_90px_rgba(0,0,0,0.24)] backdrop-blur-[12px] md:px-8">
          <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#ead7a3]">
            Dashboard Overview
          </p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-[2.4rem] leading-none md:text-[3.6rem]">
                St. Mary's Church CNI
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((item) => card(item.label, item.value, item.note))}
        </div>

        <div className="grid gap-6">
          {shell(
            "Quick Actions",
            "Working shortcuts",
            <div className="space-y-3">
              {[
                ["Restoration", "Add restoration photo update"],
                ["Documents", "Upload new church report PDF"],
                ["Donations", "Approve donor receipt request"],
              ].map(([view, label]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActiveView(view)}
                  className="w-full rounded-[20px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4 text-left text-sm leading-[1.7] text-white/80"
                >
                  {label}
                </button>
              ))}
            </div>,
          )}
        </div>
      </>
    );
  }

  function renderDonations() {
    return (
      <>
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          {shell(
          "Add Donation",
          "Create donor record",
          <div className="grid gap-4">
            <input
              type="text"
              name="donor"
              value={donationForm.donor}
              onChange={handleDonationChange}
              placeholder="Donor name"
              className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />

            <input
              type="email"
              name="email"
              value={donationForm.email}
              onChange={handleDonationChange}
              autoComplete="email"
              placeholder="Donor Email"
              className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />

            <input
              type="tel"
              name="phone"
              value={donationForm.phone}
              onChange={handleDonationChange}
              inputMode="numeric"
              maxLength={10}
              placeholder="Phone Number"
              className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />

            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base text-white/55">
                ₹
              </span>
              <input
                type="number"
                name="amount"
                value={donationForm.amount}
                onChange={handleDonationChange}
                placeholder="Amount"
                className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] py-4 pl-9 pr-4 text-white outline-none placeholder:text-white/35"
              />
            </div>

            {/* 🔥 NEW: Purpose Select */}
            <select
              name="purpose"
              value={donationForm.purpose}
              onChange={handleDonationChange}
              className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none"
            >
              {campaigns.map((campaign) => (
                <option
                  key={campaign._id || campaign.id || campaign.purpose}
                  className="text-black"
                  value={campaign.purpose}
                >
                  {campaign.purpose}
                </option>
              ))}
            </select>

            <select
              name="mode"
              value={donationForm.mode}
              onChange={handleDonationChange}
              className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none"
            >
              <option className="text-black" value="Cash">
                Cash
              </option>
            </select>

            <button
              type="button"
              onClick={addDonation}
              className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
            >
              Save Donation
            </button>
            {donationError && (
              <p className="text-sm text-[#f0b7b7]">{donationError}</p>
            )}
          </div>,
          )}

          {shell(
          "Donor Records",
          "Verify payment status",
          <div>
            <div className="max-h-[31rem] space-y-3 overflow-y-auto pr-2">
            {donations.map((item, index) => (
              <div
                key={item._id || `${item.donor}-${index}`}
                onClick={() =>
                  setSelectedDonationId((current) =>
                    current === getDonationKey(item) ? "" : getDonationKey(item),
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelectedDonationId((current) =>
                      current === getDonationKey(item) ? "" : getDonationKey(item),
                    );
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={getDonationKey(item) === selectedDonationId}
                className={`w-full overflow-hidden rounded-[22px] border px-4 py-4 text-left transition ${
                  getDonationKey(item) === selectedDonationId
                    ? "border-[#d1b06d]/60 bg-[rgba(209,176,109,0.12)] shadow-[0_16px_50px_rgba(0,0,0,0.18)]"
                    : "border-white/10 bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-serif text-[1.35rem] text-white">
                      {item.donor}
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      {formatCurrency(item.amount)} • {item.mode} 
                    </p>
                    {/* 🔥 Purpose badge */}
                    <p className="mt-1 inline-block rounded-full bg-[#d1b06d]/20 px-3 py-1 text-xs text-[#ead7a3]">
                      {item.purpose || "General Donation"}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.2em] text-[#ead7a3]">
                      {item.status}
                    </span>
                    {item.status !== "Verified" && (
                      <button
                        type="button"
                        onClick={async (event) => {
                          event.stopPropagation();
                          if (!item._id) return;

                          try {
                            const response = await apiPatch(
                              `/donations/${item._id}/verify`,
                            );

                            setDonations((current) =>
                              current.map((donation, donationIndex) =>
                                donationIndex === index
                                  ? response.data
                                  : donation,
                              ),
                            );
                          } catch (error) {
                            console.error("Unable to verify donation:", error);
                          }
                        }}
                        className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-white/85"
                        >
                          Mark Verified
                        </button>
                      )}
                    <span className="rounded-full border border-[#d1b06d]/20 px-3 py-2 text-[0.65rem] uppercase tracking-[0.22em] text-white/70">
                      {getDonationKey(item) === selectedDonationId
                        ? "Hide Details"
                        : "View Details"}
                    </span>
                  </div>
                </div>

                {getDonationKey(item) === selectedDonationId && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="space-y-5 rounded-[20px] bg-[rgba(255,255,255,0.03)] px-4 py-4">
                      <div className="border-b border-white/10 pb-4">
                        <p className="text-[0.72rem] uppercase tracking-[0.28em] text-[#ead7a3]">
                          Donor Details
                        </p>
                        <h4 className="mt-3 font-serif text-[1.7rem] text-white">
                          {item.donor}
                        </h4>
                        <p className="mt-2 text-sm leading-[1.8] text-white/68">
                          {formatCurrency(item.amount)} • {item.mode} •{" "}
                          {item.purpose || "General Donation"}
                        </p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#ead7a3]">
                            Email
                          </p>
                          <p className="mt-2 break-words text-sm text-white/82">
                            {item.email || "Not provided"}
                          </p>
                        </div>
                        <div className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#ead7a3]">
                            Phone
                          </p>
                          <p className="mt-2 text-sm text-white/82">
                            {item.phone || "Not provided"}
                          </p>
                        </div>
                        <div className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#ead7a3]">
                            Status
                          </p>
                          <p className="mt-2 text-sm text-white/82">
                            {item.status || "Pending Receipt"}
                          </p>
                        </div>
                        <div className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4">
                          <p className="text-[0.7rem] uppercase tracking-[0.22em] text-[#ead7a3]">
                            Received On
                          </p>
                          <p className="mt-2 text-sm text-white/82">
                            {formatDateTime(item.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-[20px] border border-[#d1b06d]/20 bg-[rgba(209,176,109,0.08)] px-4 py-4">
                        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-[#ead7a3]">
                          Payment Summary
                        </p>
                        <p className="mt-3 text-sm leading-[1.9] text-white/82">
                          Donation by{" "}
                          <span className="font-semibold text-white">
                            {item.donor}
                          </span>{" "}
                          for{" "}
                          <span className="font-semibold text-white">
                            {item.purpose || "General Donation"}
                          </span>{" "}
                          via{" "}
                          <span className="font-semibold text-white">
                            {item.mode}
                          </span>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>
          )}
        </div>

        {shell(
          "Funding Goals",
          "Create or update donation purposes",
          <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="grid gap-4">
              <input
                type="text"
                name="purpose"
                value={campaignForm.purpose}
                onChange={handleCampaignChange}
                placeholder="Purpose name"
                className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
              />
              <input
                type="text"
                name="title"
                value={campaignForm.title}
                onChange={handleCampaignChange}
                placeholder="Campaign title"
                className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
              />
              <textarea
                name="description"
                value={campaignForm.description}
                onChange={handleCampaignChange}
                rows={4}
                placeholder="Campaign description"
                className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
              />
              <div className="relative">
          
                <input
                  type="number"
                  min="1"
                  name="targetAmount"
                  value={campaignForm.targetAmount}
                  onChange={handleCampaignChange}
                  placeholder="Target amount"
                  className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 pl-10 text-white outline-none placeholder:text-white/35"
                />
                <span className="pointer-events-none absolute left-4 top-1/4 z-10 -translate-y-1/2 text-base leading-none text-white/55">
                  ₹
                </span>
              </div>
              <button
                type="button"
                onClick={saveCampaign}
                className="inline-flex self-start rounded-full border border-[#d1b06d] bg-[#d1b06d] px-4 py-2.5 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#24170d]"
              >
                {campaignForm.id ? "Update Goal" : "Create Goal"}
              </button>
            </div>

            <div className="max-h-[31rem] space-y-3 overflow-y-auto pr-2">
              {campaigns.map((campaign) => (
                <div
                  key={campaign._id || campaign.id || campaign.purpose}
                  className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-serif text-[1.35rem] text-white">
                        {campaign.title}
                      </p>
                      <p className="mt-1 text-sm text-white/65">
                        {campaign.purpose} • Target {formatCurrency(Number(campaign.targetAmount || 0))}
              
                      </p>
                      <p className="mt-2 text-sm leading-[1.7] text-white/70">
                        {campaign.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => editCampaign(campaign)}
                      className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-white/85"
                    >
                      Edit Goal
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCampaign(campaign)}
                      className="rounded-full border border-[#c57b7b]/30 bg-[rgba(197,123,123,0.12)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-[#f3c2c2]"
                    >
                      Remove Goal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>,
        )}
      </>
    );
  }

  function renderSimpleModule(
    title,
    eyebrow,
    items,
    addLabel,
    onAdd,
    renderRow,
  ) {
    return (
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {shell(
          "Add Record",
          addLabel,
          <div className="space-y-4">
            <input
              type="text"
              value={simpleInput}
              onChange={(event) => setSimpleInput(event.target.value)}
              placeholder={addLabel}
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
            >
              Add
            </button>
          </div>,
        )}

        {shell(
          eyebrow,
          title,
          <div className="space-y-3">{items.map(renderRow)}</div>,
        )}
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {shell(
          "Site Settings",
          "Editable website fields",
          <div className="space-y-4">
            {settingsError && (
              <p className="text-sm text-[#f0b7b7]">{settingsError}</p>
            )}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/60">
                    Church Email
                  </span>
                  <input
                    type="email"
                    name="churchEmail"
                    value={siteSettingsDraft.churchEmail}
                    onChange={updateSetting}
                    autoComplete="email"
                    readOnly={!isEditingSettings}
                    className={`w-full rounded-[18px] border border-white/10 px-4 py-4 text-white outline-none ${
                      isEditingSettings
                        ? "bg-[rgba(255,255,255,0.05)]"
                        : "cursor-default bg-[rgba(255,255,255,0.03)] text-white/85"
                    }`}
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/60">
                    Donation Phone
                  </span>
                  <input
                    type="text"
                    name="donationPhone"
                    value={siteSettingsDraft.donationPhone}
                    onChange={updateSetting}
                    inputMode="numeric"
                    maxLength={10}
                    readOnly={!isEditingSettings}
                    className={`w-full rounded-[18px] border border-white/10 px-4 py-4 text-white outline-none ${
                      isEditingSettings
                        ? "bg-[rgba(255,255,255,0.05)]"
                        : "cursor-default bg-[rgba(255,255,255,0.03)] text-white/85"
                    }`}
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-sm uppercase tracking-[0.2em] text-white/60">
                  Homepage Headline
                </span>
                <input
                  type="text"
                  name="homeHeadline"
                  value={siteSettingsDraft.homeHeadline}
                  onChange={updateSetting}
                  readOnly={!isEditingSettings}
                  className={`w-full rounded-[18px] border border-white/10 px-4 py-4 text-white outline-none ${
                    isEditingSettings
                      ? "bg-[rgba(255,255,255,0.05)]"
                      : "cursor-default bg-[rgba(255,255,255,0.03)] text-white/85"
                  }`}
                />
              </label>
            </div>
          </div>,
          <div className="flex flex-wrap gap-3">
            {isEditingSettings ? (
              <>
                <button
                  type="button"
                  onClick={saveSettings}
                  className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelSettingsEdit}
                  className="inline-flex rounded-full border border-white/15 bg-[rgba(255,255,255,0.04)] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-white/85"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={startSettingsEdit}
                className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
              >
                Edit
              </button>
            )}
          </div>,
        )}

      
      </div>
    );
  }

  function renderGallery() {
    return (
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {shell(
          "Add Record",
          "Upload gallery media",
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={galleryForm.title}
              onChange={handleGalleryChange}
              placeholder="Photo or video title"
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <select
              name="type"
              value={galleryForm.type}
              onChange={handleGalleryChange}
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none"
            >
              <option className="text-black" value="Image">
                Image
              </option>
              <option className="text-black" value="Video">
                Video
              </option>
            </select>
            <select
              name="section"
              value={galleryForm.section}
              onChange={handleGalleryChange}
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none"
            >
              <option className="text-black" value="Before Fire">
                Before Fire
              </option>
              <option className="text-black" value="After Fire">
                After Fire
              </option>
            </select>

            <div className="space-y-3">
              <input
                key={galleryForm.type}
                type="file"
                accept={galleryForm.type === "Video" ? "video/*" : "image/*"}
                onChange={handleGalleryFileChange}
                className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-sm text-white outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#d1b06d] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-[#24170d]"
              />
              {galleryForm.imageUrl &&
                (galleryForm.type === "Video" ? (
                  <video
                    src={galleryForm.imageUrl}
                    controls
                    className="h-40 w-full rounded-[18px] object-cover"
                  />
                ) : (
                  <img
                    src={galleryForm.imageUrl}
                    alt="Selected gallery preview"
                    className="h-40 w-full rounded-[18px] object-cover"
                  />
                ))}
              {galleryError && (
                <p className="text-sm text-[#f0b7b7]">{galleryError}</p>
              )}
            </div>

            <button
              type="button"
              onClick={addGalleryItem}
              className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
            >
              Add
            </button>
          </div>,
        )}

        {shell(
          "Gallery Items",
          "Current media records",
          <div className="max-h-[31rem] space-y-3 overflow-y-auto pr-2">
            {galleryItems.map((item, index) => (
              <div
                key={item._id || `${item.title}-${index}`}
                className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
              >
                {item.imageUrl &&
                  (item.type === "Video" ? (
                    <video
                      src={item.imageUrl}
                      controls
                      className="mb-4 h-40 w-full rounded-[18px] object-cover"
                    />
                  ) : (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="mb-4 h-40 w-full rounded-[18px] object-cover"
                    />
                  ))}
                <p className="font-serif text-[1.35rem] text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-white/65">
                  {item.type} • {item.section}
                </p>
              </div>
            ))}
          </div>,
        )}
      </div>
    );
  }

  function renderDocuments() {
    return (
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {shell(
          "Add Record",
          "Create document entry",
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={documentForm.title}
              onChange={handleDocumentChange}
              placeholder="Document title"
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <textarea
              name="description"
              value={documentForm.description}
              onChange={handleDocumentChange}
              rows={4}
              placeholder="Document description"
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <select
              name="type"
              value={documentForm.type}
              onChange={handleDocumentChange}
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none"
            >
              <option className="text-black" value="PDF">
                PDF
              </option>
              <option className="text-black" value="Letter">
                Letter
              </option>
            </select>

            <div className="space-y-3">
              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleDocumentFileChange}
                className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-sm text-white outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#d1b06d] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-[#24170d]"
              />
              {documentForm.fileUrl && (
                <p className="text-sm text-white/70">
                  {documentForm.type} PDF selected and ready to add.
                </p>
              )}
            </div>

            {documentError && (
              <p className="text-sm text-[#f0b7b7]">{documentError}</p>
            )}
            <button
              type="button"
              onClick={addDocument}
              className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
            >
              Add
            </button>
          </div>,
        )}

        {shell(
          "Document Library",
          "Public report list",
          <div className="max-h-[31rem] space-y-3 overflow-y-auto pr-2">
            {documents.map((item, index) => (
              <div
                key={item._id || `${item.title}-${index}`}
                className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
              >
                {item.coverImage && item.type === "PDF" && (
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="mb-4 h-40 w-full rounded-[18px] object-cover"
                  />
                )}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-serif text-[1.35rem] text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-white/65">
                      {item.type}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#ead7a3]/85">
                      Published {formatDateTime(item.publishedAt || item.updatedAt || item.createdAt)}
                    </p>
                    {item.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-white/70">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteDocumentItem(item._id)}
                    className="rounded-full border border-[#c57b7b]/30 bg-[rgba(197,123,123,0.12)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-[#f3c2c2]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>,
        )}
      </div>
    );
  }

  function renderRestoration() {
    return (
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        {shell(
          "Add Record",
          "Upload restoration update",
          <div className="space-y-4">
            <input
              type="text"
              name="title"
              value={restorationForm.title}
              onChange={handleRestorationChange}
              placeholder="Restoration update title"
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <textarea
              name="description"
              value={restorationForm.description}
              onChange={handleRestorationChange}
              rows={5}
              placeholder="Restoration update description"
              className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white outline-none placeholder:text-white/35"
            />
            <div className="rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-white/80">
              Status: Draft
            </div>
            <div className="space-y-3">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleRestorationFileChange}
                className="w-full rounded-[18px] border border-white/10 bg-[rgba(255,255,255,0.05)] px-4 py-4 text-sm text-white outline-none file:mr-4 file:rounded-full file:border-0 file:bg-[#d1b06d] file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:tracking-[0.18em] file:text-[#24170d]"
              />
              <p className="text-sm text-white/65">
                You can select multiple photos together, or choose more photos again
                to keep adding them before publishing.
              </p>
              {restorationForm.imageUrls.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm text-[#ead7a3]">
                    {restorationForm.imageUrls.length} photo
                    {restorationForm.imageUrls.length === 1 ? "" : "s"} selected
                  </p>
                  <div className="max-h-[21rem] overflow-y-auto pr-2">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {restorationForm.imageUrls.map((imageUrl, index) => (
                        <img
                          key={`${imageUrl.slice(0, 40)}-${index}`}
                          src={imageUrl}
                          alt={`Selected restoration preview ${index + 1}`}
                          className="h-40 w-full rounded-[18px] object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {restorationError && (
                <p className="text-sm text-[#f0b7b7]">{restorationError}</p>
              )}
            </div>

            <button
              type="button"
              onClick={addRestorationUpdate}
              className="inline-flex rounded-full border border-[#d1b06d] bg-[#d1b06d] px-6 py-3 font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#24170d]"
            >
              Save Draft
            </button>
          </div>,
        )}

        {shell(
          "Update List",
          "Publish or review updates",
          <div className="max-h-[31rem] space-y-3 overflow-y-auto pr-2">
            {updates.map((item, index) => (
              <div
                key={item._id || `${item.title}-${index}`}
                className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
              >
                {(item.imageUrls?.length > 0 || item.imageUrl) && (
                  <div className="mb-4 grid gap-3 sm:grid-cols-2">
                    {(item.imageUrls?.length > 0 ? item.imageUrls : [item.imageUrl]).map(
                      (imageUrl, imageIndex) => (
                        <img
                          key={`${item._id || item.title}-${imageIndex}`}
                          src={imageUrl}
                          alt={`${item.title} ${imageIndex + 1}`}
                          className="h-40 w-full rounded-[18px] object-cover"
                        />
                      ),
                    )}
                  </div>
                )}
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-serif text-[1.35rem] text-white">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-white/65">{item.status}</p>
                    {item.status === "Published" && (
                      <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#ead7a3]/85">
                        {formatDateTime(
                          item.publishedAt || item.updatedAt || item.createdAt,
                        )}
                      </p>
                    )}
                    {item.description && (
                      <p className="mt-3 max-w-2xl text-sm leading-[1.8] text-white/78">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {item.status !== "Published" && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (!item._id) return;

                          try {
                            const response = await apiPatch(
                              `/restoration/${item._id}/publish`,
                            );

                            setUpdates((current) =>
                              sortByCreatedAtDesc(
                                current.map((update, updateIndex) =>
                                  updateIndex === index ? response.data : update,
                                ),
                              ),
                            );
                          } catch (error) {
                            console.error("Unable to publish update:", error);
                          }
                        }}
                        className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-white/85"
                      >
                        Publish
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => deleteRestorationUpdate(item._id)}
                      className="rounded-full border border-[#c57b7b]/30 bg-[rgba(197,123,123,0.12)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-[#f3c2c2]"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>,
        )}
      </div>
    );
  }

  function renderContent() {
    if (activeView === "Overview") return renderOverview();
    if (activeView === "Donations") return renderDonations();
    if (activeView === "Gallery") return renderGallery();
    if (activeView === "Restoration") return renderRestoration();
    if (activeView === "Documents") return renderDocuments();
    if (activeView === "Gallery") {
      return renderSimpleModule(
        "Current media records",
        "Gallery Items",
        galleryItems,
        "Photo or video title",
        () =>
          addSimple(
            setGalleryItems,
            (value) => ({
              title: value,
              type: "Image",
              section: "Before Fire",
            }),
            "/gallery",
          ),
        (item, index) => (
          <div
            key={item._id || `${item.title}-${index}`}
            className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
          >
            <p className="font-serif text-[1.35rem] text-white">{item.title}</p>
            <p className="mt-1 text-sm text-white/65">
              {item.type} • {item.section}
            </p>
          </div>
        ),
      );
    }
    if (activeView === "Restoration") {
      return renderSimpleModule(
        "Publish or review updates",
        "Update List",
        updates,
        "Restoration update title",
        () =>
          addSimple(
            setUpdates,
            (value) => ({ title: value, status: "Draft" }),
            "/restoration",
          ),
        (item, index) => (
          <div
            key={item._id || `${item.title}-${index}`}
            className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-serif text-[1.35rem] text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-white/65">{item.status}</p>
                {item.status === "Published" && (
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#ead7a3]/85">
                    {formatDateTime(
                      item.publishedAt || item.updatedAt || item.createdAt,
                    )}
                  </p>
                )}
              </div>
              {item.status !== "Published" && (
                <button
                  type="button"
                  onClick={async () => {
                    if (!item._id) return;

                    try {
                      const response = await apiPatch(
                        `/restoration/${item._id}/publish`,
                      );

                      setUpdates((current) =>
                        sortByCreatedAtDesc(
                          current.map((update, updateIndex) =>
                            updateIndex === index ? response.data : update,
                          ),
                        ),
                      );
                    } catch (error) {
                      console.error("Unable to publish update:", error);
                    }
                  }}
                  className="rounded-full border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-2 font-sans text-xs uppercase tracking-[0.2em] text-white/85"
                >
                  Publish
                </button>
              )}
            </div>
          </div>
        ),
      );
    }
    if (activeView === "Documents") {
      return renderSimpleModule(
        "Public report list",
        "Document Library",
        documents,
        "Document title",
        () =>
          addSimple(
            setDocuments,
            (value) => ({ title: value, type: "PDF", visibility: "Public" }),
            "/documents",
          ),
        (item, index) => (
          <div
            key={item._id || `${item.title}-${index}`}
            className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] px-4 py-4"
          >
            <p className="font-serif text-[1.35rem] text-white">{item.title}</p>
            <p className="mt-1 text-sm text-white/65">
              {item.type} • {item.visibility}
            </p>
          </div>
        ),
      );
    }
    return renderSettings();
  }

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login", { replace: true });
  }

  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#120e0b] text-white">
      <div
        className="fixed inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url(${churchHome})` }}
      />
      <div className="fixed inset-0 bg-[linear-gradient(135deg,rgba(14,10,7,0.88),rgba(28,20,14,0.82))]" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,176,109,0.1),transparent_30%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] flex-col gap-6 px-4 py-6 md:px-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <aside className="rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-[10px] lg:sticky lg:top-6">
          <div className="rounded-[26px] border border-[#d1b06d]/30 bg-[rgba(209,176,109,0.08)] px-5 py-5">
            <div>
              <div>
                <p className="text-[0.78rem] uppercase tracking-[0.34em] text-[#ead7a3]">
                  Admin Panel
                </p>
                <h1 className="mt-3 font-serif text-[2rem] leading-none">
                  Saint Mary&apos;s Dashboard
                </h1>
              </div>
            </div>
            <Link
              to="/"
              className="mt-5 inline-flex text-xs uppercase tracking-[0.24em] text-white/62 transition hover:text-[#ead7a3]"
            >
              Return to website
            </Link>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.08)] px-4 py-2 font-sans text-[0.65rem] uppercase tracking-[0.22em] text-white/80 transition hover:border-[#ead7a3] hover:text-[#ead7a3]"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setActiveView(item);
                  setSimpleInput("");
                }}
                className={`w-full rounded-[20px] border px-4 py-3 text-left font-sans text-sm uppercase tracking-[0.18em] ${
                  activeView === item
                    ? "border-[#d1b06d] bg-[#d1b06d] text-[#24170d]"
                    : "border-white/10 bg-[rgba(255,255,255,0.03)] text-white/78"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6">{renderContent()}</main>
      </div>
    </section>
  );
}

export default AdminDashboard;
