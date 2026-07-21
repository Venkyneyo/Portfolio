import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, Plus, Trash2, Edit3, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { EducationItem, CertificationItem } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const EducationManager: React.FC = () => {
  const {
    education,
    certifications,
    addEducation,
    updateEducation,
    deleteEducation,
    addCertification,
    updateCertification,
    deleteCertification
  } = useApp();

  const [eduModalOpen, setEduModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<EducationItem | null>(null);
  const [eduFormData, setEduFormData] = useState<Partial<EducationItem>>({});

  const [certModalOpen, setCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<CertificationItem | null>(null);
  const [certFormData, setCertFormData] = useState<Partial<CertificationItem>>({});

  // --- Education Modal Handlers ---
  const handleOpenAddEdu = () => {
    soundFX.playClick();
    setEditingEdu(null);
    setEduFormData({
      degree: '',
      field: 'Computer Science',
      institution: '',
      period: '2020 - 2024',
      location: 'Stanford, CA',
      grade: '3.9 GPA',
      description: '',
      highlights: []
    });
    setEduModalOpen(true);
  };

  const handleOpenEditEdu = (edu: EducationItem) => {
    soundFX.playClick();
    setEditingEdu(edu);
    setEduFormData({ ...edu });
    setEduModalOpen(true);
  };

  const handleEduSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const payload: EducationItem = {
      id: editingEdu ? editingEdu.id : `edu-${Date.now()}`,
      degree: eduFormData.degree || 'B.S. Computer Science',
      field: eduFormData.field || 'Computer Science',
      institution: eduFormData.institution || 'University',
      period: eduFormData.period || '2020 - 2024',
      location: eduFormData.location || 'USA',
      grade: eduFormData.grade || '',
      description: eduFormData.description || '',
      highlights: eduFormData.highlights || []
    };

    if (editingEdu) {
      updateEducation(payload);
    } else {
      addEducation(payload);
    }

    soundFX.playSwoosh();
    setEduModalOpen(false);
  };

  // --- Certifications Modal Handlers ---
  const handleOpenAddCert = () => {
    soundFX.playClick();
    setEditingCert(null);
    setCertFormData({
      title: '',
      issuer: 'AWS',
      issueDate: '2024',
      credentialId: '',
      credentialUrl: ''
    });
    setCertModalOpen(true);
  };

  const handleOpenEditCert = (cert: CertificationItem) => {
    soundFX.playClick();
    setEditingCert(cert);
    setCertFormData({ ...cert });
    setCertModalOpen(true);
  };

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const payload: CertificationItem = {
      id: editingCert ? editingCert.id : `cert-${Date.now()}`,
      title: certFormData.title || 'Solutions Architect',
      issuer: certFormData.issuer || 'AWS',
      issueDate: certFormData.issueDate || '2024',
      credentialId: certFormData.credentialId || '',
      credentialUrl: certFormData.credentialUrl || ''
    };

    if (editingCert) {
      updateCertification(payload);
    } else {
      addCertification(payload);
    }

    soundFX.playSwoosh();
    setCertModalOpen(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Education Section */}
      <div className="space-y-4">
        <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-blue/20 flex items-center justify-center text-accent-cyan">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Education & Degrees</h3>
              <p className="text-xs text-slate-400">Manage academic degrees, universities, and GPAs.</p>
            </div>
          </div>

          <button
            onClick={handleOpenAddEdu}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue/20 border border-accent-blue/40 text-accent-cyan text-xs font-semibold hover:bg-accent-blue/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Degree</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {education.map((edu) => (
            <div key={edu.id} className="glass-card rounded-2xl p-5 border border-white/10 flex justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-accent-cyan">{edu.period} • {edu.grade}</span>
                <h4 className="text-base font-bold text-white mt-1">{edu.degree}</h4>
                <div className="text-xs font-semibold text-accent-purple">{edu.institution}</div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleOpenEditEdu(edu)} className="p-1.5 rounded-lg text-accent-cyan hover:bg-white/5">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteEducation(edu.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-white/5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <div className="glass-card rounded-3xl p-6 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-purple/20 flex items-center justify-center text-accent-violet">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Industry Certifications</h3>
              <p className="text-xs text-slate-400">Manage AWS, CNCF, GCP, and Kubernetes credentials.</p>
            </div>
          </div>

          <button
            onClick={handleOpenAddCert}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-purple/20 border border-accent-purple/40 text-accent-violet text-xs font-semibold hover:bg-accent-purple/30"
          >
            <Plus className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="glass-card rounded-2xl p-5 border border-white/10 flex justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-accent-pink">{cert.issuer} • {cert.issueDate}</span>
                <h4 className="text-base font-bold text-white mt-1">{cert.title}</h4>
                {cert.credentialId && <div className="text-[11px] font-mono text-slate-400">ID: {cert.credentialId}</div>}
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleOpenEditCert(cert)} className="p-1.5 rounded-lg text-accent-cyan hover:bg-white/5">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteCertification(cert.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-white/5">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Modal */}
      <AnimatePresence>
        {eduModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-panel max-w-md w-full rounded-3xl p-6 border border-white/15 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white">{editingEdu ? 'Edit Degree' : 'Add Degree'}</h3>
                <button onClick={() => setEduModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <form onSubmit={handleEduSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">DEGREE TITLE</label>
                  <input type="text" required value={eduFormData.degree || ''} onChange={(e) => setEduFormData({ ...eduFormData, degree: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">INSTITUTION</label>
                  <input type="text" required value={eduFormData.institution || ''} onChange={(e) => setEduFormData({ ...eduFormData, institution: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">PERIOD</label>
                    <input type="text" value={eduFormData.period || ''} onChange={(e) => setEduFormData({ ...eduFormData, period: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">GRADE / GPA</label>
                    <input type="text" value={eduFormData.grade || ''} onChange={(e) => setEduFormData({ ...eduFormData, grade: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">DESCRIPTION</label>
                  <textarea rows={2} value={eduFormData.description || ''} onChange={(e) => setEduFormData({ ...eduFormData, description: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setEduModalOpen(false)} className="px-4 py-2 bg-white/5 text-xs rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-accent-blue text-white text-xs rounded-xl font-bold">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Certifications Modal */}
      <AnimatePresence>
        {certModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="glass-panel max-w-md w-full rounded-3xl p-6 border border-white/15 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="text-base font-bold text-white">{editingCert ? 'Edit Certification' : 'Add Certification'}</h3>
                <button onClick={() => setCertModalOpen(false)}><X className="w-4 h-4 text-slate-400" /></button>
              </div>
              <form onSubmit={handleCertSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">CERTIFICATION TITLE</label>
                  <input type="text" required value={certFormData.title || ''} onChange={(e) => setCertFormData({ ...certFormData, title: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">ISSUER</label>
                    <input type="text" required value={certFormData.issuer || ''} onChange={(e) => setCertFormData({ ...certFormData, issuer: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">YEAR / DATE</label>
                    <input type="text" value={certFormData.issueDate || ''} onChange={(e) => setCertFormData({ ...certFormData, issueDate: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">CREDENTIAL ID</label>
                  <input type="text" value={certFormData.credentialId || ''} onChange={(e) => setCertFormData({ ...certFormData, credentialId: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">VERIFICATION URL</label>
                  <input type="text" value={certFormData.credentialUrl || ''} onChange={(e) => setCertFormData({ ...certFormData, credentialUrl: e.target.value })} className="w-full px-3 py-2 bg-[#050816] border border-white/10 rounded-xl text-white text-xs" />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setCertModalOpen(false)} className="px-4 py-2 bg-white/5 text-xs rounded-xl">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-accent-purple text-white text-xs rounded-xl font-bold">Save</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
