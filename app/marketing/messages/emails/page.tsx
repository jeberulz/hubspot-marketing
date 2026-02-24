"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ArrowUpRight, Mail } from "lucide-react";
import { emails, emailNavItems } from "@/lib/data/emails";

function getAiScoreStyle(score: number) {
  if (score >= 80)
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (score >= 60)
    return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

export default function AllEmailsPage() {
  const [search, setSearch] = useState("");

  const allEmails = emailNavItems
    .map((nav) => {
      const email = emails[nav.id];
      return email
        ? {
            ...email,
            navScore: nav.score,
            navStatus: nav.status,
            navDetail: nav.statusDetail,
          }
        : null;
    })
    .filter(Boolean)
    .filter(
      (e) =>
        !search ||
        e!.name.toLowerCase().includes(search.toLowerCase()) ||
        e!.subject.toLowerCase().includes(search.toLowerCase()) ||
        e!.segment.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-10 flex-1 flex flex-col max-w-[1400px] w-full mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#33475B] tracking-tight mb-1.5">
            All Emails
          </h1>
          <p className="text-sm text-[#516F90]">
            View and optimize all emails across segments. Sorted by AI score
            (lowest first).
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center bg-white border border-[#cbd6e2] rounded px-3 py-2 gap-2 w-80 focus-within:border-[#0091AE] transition-colors">
          <Search size={14} className="text-[#516F90]" />
          <input
            type="text"
            placeholder="Search emails by name, subject, or segment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-[#33475B] w-full placeholder-[#516F90]/60"
          />
        </div>
        <span className="text-xs text-[#516F90]">
          {allEmails.length} email{allEmails.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#EAF0F6] rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-[#EAF0F6]">
              <th className="text-left py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                Email Name
              </th>
              <th className="text-left py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                Segment
              </th>
              <th className="text-left py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                Channel
              </th>
              <th className="text-left py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                Status
              </th>
              <th className="text-right py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                Open Rate
              </th>
              <th className="text-right py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                Click Rate
              </th>
              <th className="text-center py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider">
                AI Score
              </th>
              <th className="text-right py-3 px-5 text-[#516F90] font-medium text-xs uppercase tracking-wider w-20">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allEmails.map((email) => (
              <tr
                key={email!.id}
                className="border-b border-[#EAF0F6] hover:bg-gray-50/50 transition-colors group"
              >
                <td className="py-4 px-5">
                  <Link
                    href={`/marketing/messages/email/${email!.id}`}
                    className="font-medium text-[#00A4BD] group-hover:underline"
                  >
                    {email!.name}
                  </Link>
                  <div className="text-xs text-[#516F90] mt-0.5 truncate max-w-[300px]">
                    {email!.subject}
                  </div>
                </td>
                <td className="py-4 px-5 text-[#516F90]">{email!.segment}</td>
                <td className="py-4 px-5">
                  <span className="flex items-center gap-1.5 text-[#516F90]">
                    <Mail size={12} />
                    {email!.channel}
                  </span>
                </td>
                <td className="py-4 px-5">
                  <span
                    className={`flex items-center gap-1.5 text-xs font-medium ${
                      email!.status === "Active"
                        ? "text-emerald-700"
                        : "text-[#516F90]"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        email!.status === "Active"
                          ? "bg-emerald-500"
                          : "bg-[#cbd6e2]"
                      }`}
                    />
                    {email!.status}
                  </span>
                </td>
                <td className="py-4 px-5 text-right font-medium">
                  {email!.metrics.openRate}%
                </td>
                <td className="py-4 px-5 text-right font-medium">
                  {email!.metrics.clickRate}%
                </td>
                <td className="py-4 px-5 text-center">
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-semibold text-xs border ${getAiScoreStyle(
                      email!.score.overall
                    )}`}
                  >
                    {email!.score.overall}
                  </div>
                </td>
                <td className="py-4 px-5 text-right">
                  <Link
                    href={`/marketing/messages/email/${email!.id}`}
                    className="text-xs font-medium text-[#00A4BD] hover:underline flex items-center gap-1 justify-end"
                  >
                    Optimize
                    <ArrowUpRight size={12} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
