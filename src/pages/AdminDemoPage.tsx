import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Users,
  Camera,
  AlertOctagon,
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  ArrowLeft,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const AdminDemoPage: React.FC = () => {
  const {
    profiles,
    reports,
    deleteSampleMember,
    approvePhoto,
    rejectPhoto,
    resolveReport,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'members' | 'photos' | 'reports'>('overview');

  // Filter profiles pending photo approval (or unverified photos)
  const pendingPhotoProfiles = profiles.filter(
    (p) => p.isPendingPhotoApproval || !p.photoChecked
  );

  const pendingReports = reports.filter((r) => r.status === 'pending');

  return (
    <div className="min-h-screen bg-[#FAF4EA] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E8DCC3] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                to="/"
                className="text-xs text-[#756353] hover:text-[#2B2118] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sakeena</span>
              </Link>
              <span className="text-xs text-[#E8DCC3]">•</span>
              <span className="text-[11px] font-semibold text-[#A34D28] uppercase tracking-wider">
                Simulated Administration
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h1
                className="text-2xl sm:text-3xl font-serif font-medium text-[#2B2118]"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Sakeena Demo Administration
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-[#FAF4EA] border border-[#C99A2E] text-[10px] font-bold text-[#2B2118]">
                CLIENT DEMO
              </span>
            </div>
            <p className="text-xs text-[#756353] mt-1">
              Demonstrating the moderation and member operations requested by Olympia Enterprises LLC.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-white rounded-xl p-1 border border-[#E8DCC3]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'members'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              Members ({profiles.length})
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'photos'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              <span>Photos</span>
              {pendingPhotoProfiles.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#A34D28] text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingPhotoProfiles.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'reports'
                  ? 'bg-[#2B2118] text-[#FAF4EA]'
                  : 'text-[#756353] hover:text-[#2B2118]'
              }`}
            >
              <span>Reports</span>
              {pendingReports.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#A34D28] text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingReports.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-[#E8DCC3] p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#756353]">
                    Sample Members
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF4EA] text-[#2B2118] flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-[#2B2118]">
                  {profiles.length}
                </div>
                <p className="text-[11px] text-[#A34D28] font-medium mt-1">
                  Active across 4 regions
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8DCC3] p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#756353]">
                    Pending Photos
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF4EA] text-[#C99A2E] flex items-center justify-center">
                    <Camera className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-[#2B2118]">
                  {pendingPhotoProfiles.length}
                </div>
                <p className="text-[11px] text-[#756353] mt-1">
                  Awaiting campus verification
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8DCC3] p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#756353]">
                    Community Reports
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF4EA] text-[#A34D28] flex items-center justify-center">
                    <AlertOctagon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-serif font-bold text-[#2B2118]">
                  {pendingReports.length}
                </div>
                <p className="text-[11px] text-[#756353] mt-1">
                  {reports.length} total demo logs
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8DCC3] p-5 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#756353]">
                    Revenue Model
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF4EA] text-[#C99A2E] flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-serif font-bold text-[#2B2118]">
                  Free + Tiered
                </div>
                <p className="text-[11px] text-[#756353] mt-1">
                  Silver / Gold / Elite
                </p>
              </div>
            </div>

            {/* Quick Activity Preview */}
            <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 shadow-xs">
              <h3 className="font-serif font-semibold text-lg text-[#2B2118] mb-4">
                Recently Active Sample Members
              </h3>
              <div className="divide-y divide-[#FAF4EA]">
                {profiles.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E8DCC3]"
                      />
                      <div>
                        <div className="font-semibold text-[#2B2118] flex items-center gap-1.5">
                          <span>{member.name}</span>
                          <span className="text-[10px] text-[#A34D28] font-medium">
                            • {member.tier}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#756353]">
                          {member.university} • {member.city}, {member.country}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/profile/${member.id}`}
                        className="p-1.5 rounded-lg border border-[#E8DCC3] hover:bg-[#FAF4EA] text-[#756353] hover:text-[#2B2118]"
                        title="View profile"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBER MANAGEMENT */}
        {activeTab === 'members' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC3] overflow-hidden shadow-xs">
            <div className="p-5 border-b border-[#FAF4EA] flex items-center justify-between">
              <div>
                <h3 className="font-serif font-semibold text-lg text-[#2B2118]">
                  Sample Member Directory ({profiles.length})
                </h3>
                <p className="text-xs text-[#756353]">
                  Demonstrates mock member moderation and removal.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF4EA] text-[#756353] border-b border-[#E8DCC3] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Member</th>
                    <th className="py-3 px-4">University & Major</th>
                    <th className="py-3 px-4">Region</th>
                    <th className="py-3 px-4">Tier</th>
                    <th className="py-3 px-4">Verification</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#FAF4EA]">
                  {profiles.map((member) => (
                    <tr key={member.id} className="hover:bg-[#FAF4EA]/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover border border-[#E8DCC3]"
                          />
                          <div>
                            <span className="font-semibold text-[#2B2118] block">
                              {member.name}
                            </span>
                            <span className="text-[10px] text-[#756353]">
                              {member.age} yrs • {member.denomination}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-[#756353]">
                        <span className="font-medium text-[#2B2118] block">
                          {member.university}
                        </span>
                        <span className="text-[10px]">{member.major}</span>
                      </td>

                      <td className="py-3 px-4 text-[#756353]">
                        {member.city}, {member.country}
                      </td>

                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-full bg-[#FAF4EA] border border-[#E8DCC3] text-[10px] font-semibold text-[#A34D28]">
                          {member.tier}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex gap-1">
                          {member.emailVerified && (
                            <span className="px-1.5 py-0.5 rounded bg-white border border-[#E8DCC3] text-[10px] text-[#C99A2E]">
                              Email
                            </span>
                          )}
                          {member.photoChecked && (
                            <span className="px-1.5 py-0.5 rounded bg-white border border-[#E8DCC3] text-[10px] text-[#A34D28]">
                              Photo
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/profile/${member.id}`}
                            className="p-1 rounded-md text-[#756353] hover:text-[#2B2118]"
                            title="Inspect"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => deleteSampleMember(member.id)}
                            className="p-1 rounded-md text-[#756353] hover:text-[#A34D28]"
                            title="Remove from sample dataset"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: PHOTO MODERATION */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#2B2118] mb-1">
                Photo Moderation Queue ({pendingPhotoProfiles.length})
              </h3>
              <p className="text-xs text-[#756353]">
                Approve or reject sample portrait photos to simulate platform safety enforcement.
              </p>
            </div>

            {pendingPhotoProfiles.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#756353] bg-[#FAF4EA] rounded-2xl border border-[#E8DCC3]">
                No pending photos in the queue. All sample member photos are approved.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingPhotoProfiles.map((member) => (
                  <div
                    key={member.id}
                    className="border border-[#E8DCC3] rounded-2xl overflow-hidden bg-[#FAF4EA]/40 p-4 space-y-3"
                  >
                    <div className="aspect-[4/5] rounded-xl overflow-hidden border border-[#E8DCC3]">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-xs text-[#2B2118]">
                        {member.name}, {member.age}
                      </h4>
                      <p className="text-[11px] text-[#756353]">
                        {member.university} • {member.city}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-[#E8DCC3]/60">
                      <button
                        onClick={() => approvePhoto(member.id)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#C99A2E]" />
                        Approve
                      </button>
                      <button
                        onClick={() => rejectPhoto(member.id)}
                        className="flex-1 py-1.5 px-3 rounded-lg border border-[#A34D28] text-[#A34D28] hover:bg-[#A34D28] hover:text-white text-xs font-semibold flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: REPORTS MANAGEMENT */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-3xl border border-[#E8DCC3] p-6 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif font-semibold text-lg text-[#2B2118] mb-1">
                Community Reports Log ({reports.length})
              </h3>
              <p className="text-xs text-[#756353]">
                Incoming member concerns submitted via the frontend Report action.
              </p>
            </div>

            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="p-4 rounded-2xl border border-[#E8DCC3] bg-[#FAF4EA]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-[#2B2118]">
                        Report against: {report.targetUserName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          report.status === 'pending'
                            ? 'bg-[#A34D28] text-white'
                            : 'bg-[#E8DCC3] text-[#2B2118]'
                        }`}
                      >
                        {report.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs text-[#A34D28] font-medium">
                      Reason: {report.reason}
                    </p>

                    {report.notes && (
                      <p className="text-[11px] text-[#756353] italic">
                        "{report.notes}"
                      </p>
                    )}

                    <span className="text-[10px] text-[#756353]">
                      Logged {report.timestamp}
                    </span>
                  </div>

                  {report.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => resolveReport(report.id, 'reviewed')}
                        className="px-3 py-1.5 rounded-xl border border-[#E8DCC3] bg-white hover:bg-[#FAF4EA] text-xs font-medium text-[#2B2118]"
                      >
                        Mark Reviewed
                      </button>
                      <button
                        onClick={() => resolveReport(report.id, 'action_taken')}
                        className="px-3 py-1.5 rounded-xl bg-[#2B2118] hover:bg-[#4A3B2C] text-[#FAF4EA] text-xs font-semibold"
                      >
                        Action Taken
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
