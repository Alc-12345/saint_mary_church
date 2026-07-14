import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPatch } from "../lib/api";
import {
  FiSearch,
  FiUsers,
  FiDollarSign,
  FiCheckCircle,
  FiClock,
  FiEye,
} from "react-icons/fi";





const formatCurrency = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

export default function DonorList() {
  const [search, setSearch] = useState("");
  const [purpose, setPurpose] = useState("All");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [donorData, setDonorData] = useState([]);

  useEffect(() => {
  loadDonors();
}, []);

const loadDonors = async () => {
  try {
    const res = await apiGet("/donations");
    setDonorData(res.data || []);
  } catch (err) {
    console.error(err);
  }
};

  const purposes = [
    "All",
    ...new Set(donorData.map((item) => item.purpose)),
  ];

  const filteredDonors = useMemo(() => {
    return donorData.filter((item) => {
      const matchesSearch = item.donor
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPurpose =
        purpose === "All" || item.purpose === purpose;

      return matchesSearch && matchesPurpose;
    });
  }, [search, purpose]);

  const totalDonation = filteredDonors.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const verified = filteredDonors.filter(
    (item) => item.status === "Verified"
  ).length;

  const pending = filteredDonors.filter(
    (item) => item.status === "Pending"
  ).length;

  return (
    <section className="min-h-screen bg-[#120e0b] text-white p-6">

      {/* Header */}

      {/* <div className="rounded-[32px] border border-white/10 bg-[rgba(255,255,255,0.04)] backdrop-blur-md p-8">

        <p className="uppercase tracking-[0.35em] text-[#d1b06d] text-xs">
          Donation Management
        </p>

        <h1 className="font-serif text-5xl mt-4">
          Donor List
        </h1>

        <p className="mt-4 text-white/60 max-w-2xl leading-8">
          Manage every donor, track donations, verify payments and
          view complete donor information from one place.
        </p>

      </div> */}

      {/* Stats */}

      {/* <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5 mt-8">

        <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,.04)] p-6">

          <div className="flex justify-between">

            <p className="uppercase tracking-[0.22em] text-xs text-[#d1b06d]">
              Total Donors
            </p>

            <FiUsers className="text-2xl text-[#d1b06d]" />

          </div>

          <h2 className="text-4xl font-semibold mt-5">
            {filteredDonors.length}
          </h2>

          <p className="text-white/50 mt-2">
            Registered Donors
          </p>

        </div>

        <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,.04)] p-6">

          <div className="flex justify-between">

            <p className="uppercase tracking-[0.22em] text-xs text-[#d1b06d]">
              Total Donation
            </p>

            <FiDollarSign className="text-2xl text-[#d1b06d]" />

          </div>

          <h2 className="text-3xl font-semibold mt-5">
            {formatCurrency(totalDonation)}
          </h2>

          <p className="text-white/50 mt-2">
            Collected Amount
          </p>

        </div>

        <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,.04)] p-6">

          <div className="flex justify-between">

            <p className="uppercase tracking-[0.22em] text-xs text-[#d1b06d]">
              Verified
            </p>

            <FiCheckCircle className="text-2xl text-green-400" />

          </div>

          <h2 className="text-4xl font-semibold mt-5">
            {verified}
          </h2>

          <p className="text-white/50 mt-2">
            Successful Donations
          </p>

        </div>

        <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,.04)] p-6">

          <div className="flex justify-between">

            <p className="uppercase tracking-[0.22em] text-xs text-[#d1b06d]">
              Pending
            </p>

            <FiClock className="text-2xl text-orange-400" />

          </div>

          <h2 className="text-4xl font-semibold mt-5">
            {pending}
          </h2>

          <p className="text-white/50 mt-2">
            Need Verification
          </p>

        </div>

      </div> */}

      {/* Filters */}

      <div className="rounded-[30px] border border-white/10 bg-[rgba(255,255,255,.04)] mt-8 p-6">

        <div className="grid lg:grid-cols-[1fr_auto] gap-5 items-center">

  {/* Search */}
  <div className="relative">
    <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 text-xl" />

    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search donor..."
      className="w-full rounded-full border border-white/10 bg-[rgba(255,255,255,.05)] py-4 pl-14 pr-5 outline-none"
    />
  </div>

  {/* Right Side */}
  <div className="flex items-center gap-4">

    <select
      value={purpose}
      onChange={(e) => setPurpose(e.target.value)}
      className="rounded-full border border-white/10 bg-[rgba(255,255,255,.05)] px-5 py-4 outline-none"
    >
      {purposes.map((item) => (
        <option
          key={item}
          value={item}
          className="text-black"
        >
          {item}
        </option>
      ))}
    </select>

    <button
      type="button"
      className="rounded-full bg-[#d1b06d] px-7 py-4 font-semibold text-[#24170d] transition-all duration-300 hover:scale-105 hover:bg-[#e4bf74]"
    >
      Save
    </button>

  </div>

</div>

      </div>
            {/* Donor List */}

      <div className="mt-8 rounded-[30px] border border-white/10 bg-[rgba(255,255,255,.04)] backdrop-blur-md overflow-hidden">

        {/* Table Header */}

        <div className="hidden lg:grid grid-cols-[2.3fr_1.5fr_1.3fr_1.2fr_1fr_1fr] gap-4 px-8 py-5 border-b border-white/10 text-xs uppercase tracking-[0.22em] text-[#d1b06d]">

          <p>Donor</p>
          <p>Purpose</p>
          <p>Amount</p>
          <p>Mode</p>
          <p>Status</p>
          <p className="text-center">Action</p>

        </div>

        {/* Donors */}

        <div className="max-h-[600px] overflow-y-auto divide-y divide-white/10 pr-2">

          {filteredDonors.map((item) => (

            <div
              key={item.id}
              className="transition hover:bg-[rgba(255,255,255,.03)]"
            >

              {/* Desktop */}

              <div className="hidden lg:grid grid-cols-[2.3fr_1.5fr_1.3fr_1.2fr_1fr_1fr] gap-4 items-center px-8 py-6">

                {/* Donor */}

                <div className="flex items-center gap-4">

                  <div className="h-14 w-14 rounded-full bg-[#d1b06d] flex items-center justify-center text-[#24170d] text-xl font-bold">

                    {item.donor.charAt(0)}

                  </div>

                  <div>
                  

                    <h3 className="font-serif text-xl">

                      {item.donor}

                    </h3>

                    <p className="text-white/55 text-sm mt-1">

                      {item.email}

                    </p>

                    <p className="text-white/40 text-xs mt-1">

                      {item.phone}

                    </p>

                  </div>

                </div>

                {/* Purpose */}

                <div>

                  <span className="inline-flex rounded-full bg-[#d1b06d]/15 border border-[#d1b06d]/30 px-4 py-2 text-sm text-[#ead7a3]">

                    {item.purpose}

                  </span>

                </div>

                {/* Amount */}

                <div>

                  <h3 className="font-semibold text-lg">

                    {formatCurrency(item.amount)}

                  </h3>

                  <p className="text-xs text-white/45 mt-1">

                    {new Date(item.createdAt).toLocaleDateString("en-IN")}

                  </p>

                </div>

                {/* Mode */}

                <div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">

                    {item.mode}

                  </span>

                </div>

                {/* Status */}

                <div>

                  {item.status === "Verified" ? (

                    <span className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-300">

                      Verified

                    </span>

                  ) : (

                    <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-300">

                      Pending

                    </span>

                  )}

                </div>

                {/* Action */}

               <div className="flex items-center justify-center gap-4">

    <button
        onClick={() => setSelectedDonor(item)}
        className="rounded-full bg-[#d1b06d] px-4 py-2 text-[#24170d]"
    >
        View
    </button>

    <input
        type="checkbox"
        className="h-5 w-5 accent-[#d1b06d]"
    />

</div>

              </div>

              {/* Mobile Card */}

              <div className="lg:hidden p-5">

                <div className="flex gap-4">

                  <div className="h-14 w-14 rounded-full bg-[#d1b06d] flex items-center justify-center text-[#24170d] text-xl font-bold shrink-0">

                    {item.donor.charAt(0)}

                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between items-start">

                      <div>

                        <h3 className="font-serif text-2xl">

                          {item.donor}

                        </h3>

                        <p className="text-white/55 text-sm">

                          {item.email}

                        </p>

                      </div>

                      {item.status === "Verified" ? (

                        <span className="rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs text-green-300">

                          Verified

                        </span>

                      ) : (

                        <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs text-orange-300">

                          Pending

                        </span>

                      )}

                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5">

                      <div>

                        <p className="text-xs uppercase tracking-widest text-white/40">

                          Purpose

                        </p>

                        <p className="mt-2">

                          {item.purpose}

                        </p>

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-white/40">

                          Amount

                        </p>

                        <p className="mt-2 font-semibold">

                          {formatCurrency(item.amount)}

                        </p>

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-white/40">

                          Mode

                        </p>

                        <p className="mt-2">

                          {item.mode}

                        </p>

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-widest text-white/40">

                          Date

                        </p>

                        <p className="mt-2">

                          {item.verifiedAt
  ? new Date(item.verifiedAt).toLocaleDateString("en-IN")
  : "-"}

                        </p>

                      </div>

                    </div>

                    <button
                      onClick={() => setSelectedDonor(item)}
                      className="mt-6 w-full rounded-full bg-[#d1b06d] py-3 font-semibold text-[#24170d]"
                    >
                      View Details
                    </button>
                    

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
            {/* Donor Details Modal */}

      {selectedDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-white/10 bg-[#18120e] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            {/* Header */}

            <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">

              <div className="flex items-center gap-5">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#d1b06d] text-3xl font-bold text-[#24170d]">
                  {selectedDonor.donor.charAt(0)}
                </div>

                <div>
                  <h2 className="font-serif text-3xl">
                    {selectedDonor.donor}
                  </h2>

                  <p className="mt-2 text-white/60">
                    Donor Information
                  </p>
                </div>

              </div>

              <button
                onClick={() => setSelectedDonor(null)}
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm hover:bg-white/10"
              > 
                Close
              </button>

            </div>

            {/* Details */}

            <div className="grid gap-5 p-8 md:grid-cols-2">

              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
                  Email
                </p>

                <p className="mt-3 text-lg">
                  {selectedDonor.email}
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
                  Phone
                </p>

                <p className="mt-3 text-lg">
                  {selectedDonor.phone}
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
                  Donation Purpose
                </p>

                <select
  defaultValue={selectedDonor.purpose}
  className="mt-3 w-full rounded-xl border border-white/10 bg-[#211913] px-4 py-3 outline-none"
>
  <option>Church Restoration</option>
  <option>Roof Repair</option>
  <option>Children Education</option>
  <option>Medical Help</option>
</select>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
                  Payment Mode
                </p>

                <p className="mt-3 text-lg">
                  {selectedDonor.mode}
                </p>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
                  Donation Amount
                </p>

                <h3 className="mt-3 text-3xl font-bold text-[#d1b06d]">
                  {formatCurrency(selectedDonor.amount)}
                </h3>
              </div>

              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
                  Donation Date
                </p>

                <p className="mt-3 text-lg">
                  {selectedDonor.date}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
  <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
    Verified Date
  </p>

  <p className="mt-3 text-lg">
    {selectedDonor.verifiedDate}
  </p>
</div>

<div className="rounded-[22px] border border-white/10 bg-white/[0.03] p-5">
  <p className="text-xs uppercase tracking-[0.25em] text-[#d1b06d]">
    Verified By
  </p>

  <p className="mt-3 text-lg">
    {selectedDonor.verifiedBy}
  </p>
</div>

            </div>

            {/* Summary */}

            <div className="border-t border-white/10 px-8 py-6">

              <div className="rounded-[24px] border border-[#d1b06d]/20 bg-[#d1b06d]/10 p-6">

                <p className="text-xs uppercase tracking-[0.28em] text-[#d1b06d]">
                  Donation Summary
                </p>

                <p className="mt-4 text-lg leading-8 text-white/80">

                  <span className="font-semibold text-white">
                    {selectedDonor.donor}
                  </span>{" "}
                  donated{" "}
                  <span className="font-semibold text-[#d1b06d]">
                    {formatCurrency(selectedDonor.amount)}
                  </span>{" "}
                  for{" "}
                  <span className="font-semibold text-white">
                    {selectedDonor.purpose}
                  </span>{" "}
                  through{" "}
                  <span className="font-semibold text-white">
                    {selectedDonor.mode}
                  </span>
                  .

                </p>

              </div>

            </div>
            <div className="flex justify-end gap-4 border-t border-white/10 p-6">

  <button
    onClick={() => setSelectedDonor(null)}
    className="rounded-full border border-white/10 px-6 py-3"
  >
    Cancel
  </button>

  <button
    className="rounded-full bg-[#d1b06d] px-8 py-3 font-semibold text-[#24170d]"
  >
    Save Changes
  </button>

</div>

          </div>

        </div>
      )}

    </section>
  );
}
