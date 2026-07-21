import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Trash2, Send, Clock, User, Sparkles, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { MessageItem } from '../../types';
import { soundFX } from '../../utils/soundFX';

export const MessagesInbox: React.FC = () => {
  const { messages, markMessageRead, deleteMessage } = useApp();
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(messages[0] || null);
  const [replyText, setReplyText] = useState('');
  const [replySent, setReplySent] = useState(false);

  const handleSelectMessage = (msg: MessageItem) => {
    soundFX.playClick();
    setSelectedMessage(msg);
    if (msg.status === 'unread') {
      markMessageRead(msg.id);
    }
  };

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    soundFX.playSwoosh();
    setReplySent(true);
    setTimeout(() => {
      setReplySent(false);
      setReplyText('');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      
      {/* Left Column: Messages List */}
      <div className="lg:col-span-5 glass-card rounded-3xl p-4 border border-white/10 space-y-3">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent-cyan" />
            <span>Inbound Messages ({messages.length})</span>
          </h3>
          <span className="text-[10px] font-mono text-accent-pink">
            {messages.filter((m) => m.status === 'unread').length} Unread
          </span>
        </div>

        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {messages.map((msg) => {
            const isSelected = selectedMessage?.id === msg.id;
            return (
              <div
                key={msg.id}
                onClick={() => handleSelectMessage(msg)}
                onMouseEnter={() => soundFX.playHover()}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-accent-blue/20 to-accent-purple/20 border-accent-purple/50 shadow-glow-purple'
                    : msg.status === 'unread'
                    ? 'bg-white/10 border-accent-cyan/40'
                    : 'bg-white/5 border-white/10 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-white text-xs truncate max-w-[180px]">{msg.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">{msg.date}</span>
                </div>
                <div className="text-xs font-semibold text-accent-cyan mb-1 truncate">{msg.subject}</div>
                <p className="text-[11px] text-slate-300 line-clamp-1">{msg.message}</p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10 text-[10px] font-mono">
                  <span
                    className={`px-2 py-0.5 rounded ${
                      msg.priority === 'high'
                        ? 'bg-rose-500/20 text-rose-300'
                        : msg.priority === 'medium'
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}
                  >
                    {msg.priority.toUpperCase()} PRIORITY
                  </span>

                  {msg.status === 'unread' && (
                    <span className="flex items-center gap-1 text-accent-pink font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-pink animate-pulse" />
                      UNREAD
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Message Detail Drawer */}
      <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10">
        {selectedMessage ? (
          <div className="space-y-6">
            
            {/* Sender Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink p-[1px]">
                  <div className="w-full h-full rounded-[15px] bg-slate-900 flex items-center justify-center font-bold text-white text-lg">
                    {selectedMessage.name.substring(0, 1)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedMessage.name}</h3>
                  <a href={`mailto:${selectedMessage.email}`} className="text-xs font-mono text-accent-cyan hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFX.playClick();
                  deleteMessage(selectedMessage.id);
                  setSelectedMessage(null);
                }}
                className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all cursor-pointer"
                title="Delete Message"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Subject & Body */}
            <div>
              <div className="text-xs font-mono text-slate-400 mb-1">SUBJECT:</div>
              <h4 className="text-base font-bold text-white mb-4">{selectedMessage.subject}</h4>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 text-sm leading-relaxed whitespace-pre-line">
                {selectedMessage.message}
              </div>
            </div>

            {/* Quick Reply Form */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h4 className="text-xs font-mono text-accent-cyan flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Quick Response Composer</span>
              </h4>

              {replySent ? (
                <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Reply transmitted to {selectedMessage.email}</span>
                </div>
              ) : (
                <form onSubmit={handleSendReply} className="space-y-3">
                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`Reply to ${selectedMessage.name}...`}
                    className="w-full px-4 py-3 rounded-xl bg-[#050816] border border-white/10 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-accent-cyan resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink text-white font-bold text-xs shadow-glow-purple flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Quick Reply</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 text-xs font-mono">
            <span>Select a message from the left to view contents</span>
          </div>
        )}
      </div>

    </div>
  );
};
