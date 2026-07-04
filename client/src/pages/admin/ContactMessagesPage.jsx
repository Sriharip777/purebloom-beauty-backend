import { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const load = () => contactAPI.getAll({ status: filter || undefined, limit: 100 }).then((res) => setMessages(res.data.messages)).catch(() => {});

  useEffect(() => { load().finally(() => setLoading(false)); }, [filter]);

  const handleStatus = async (id, status) => {
    try {
      await contactAPI.updateStatus(id, { status });
      toast.success(`Marked as ${status}`);
      load();
    } catch { toast.error('Error updating status'); }
  };

  if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl lg:text-3xl text-navy">Contact Messages</h1>
          <p className="text-sm text-navy/40 font-sans">{messages.length} messages</p>
        </div>
        <div className="flex gap-2">
          {['', 'new', 'read', 'replied'].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`text-[10px] px-3 py-1.5 rounded-full font-sans transition-colors ${
              filter === s ? 'bg-navy text-white' : 'bg-cream-100 text-navy/60 hover:bg-cream-200'
            }`}>{s || 'All'}</button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {messages.map((msg) => (
          <motion.div key={msg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl card-shadow p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-lg text-navy">{msg.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <a href={`mailto:${msg.email}`} className="flex items-center gap-1 text-xs text-navy/50 hover:text-navy font-sans transition-colors">
                    <HiOutlineMail size="12" /> {msg.email}
                  </a>
                  {msg.phone && (
                    <span className="flex items-center gap-1 text-xs text-navy/40 font-sans">
                      <HiOutlinePhone size="12" /> {msg.phone}
                    </span>
                  )}
                </div>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full font-sans uppercase tracking-wider ${
                msg.status === 'new' ? 'bg-bloom-100 text-bloom-700' : msg.status === 'read' ? 'bg-cream-200 text-navy/60' : msg.status === 'replied' ? 'bg-green-50 text-green-600' : 'bg-navy/5 text-navy/40'
              }`}>{msg.status}</span>
            </div>
            <p className="text-xs text-navy/40 font-sans mb-1 font-medium">{msg.subject}</p>
            <p className="text-sm text-navy/60 font-sans leading-relaxed">{msg.message}</p>
            <div className="flex items-center gap-3 mt-4 pt-3 border-t border-cream-100">
              <p className="text-[10px] text-navy/30 font-sans">{new Date(msg.createdAt).toLocaleString()}</p>
              <div className="flex gap-2 ml-auto">
                <button onClick={() => handleStatus(msg._id, 'read')} className="text-[10px] px-3 py-1 rounded-full bg-cream-100 text-navy/60 hover:bg-cream-200 font-sans flex items-center gap-1 transition-colors">
                  <HiOutlineCheckCircle size="11" /> Mark Read
                </button>
                <button onClick={() => handleStatus(msg._id, 'replied')} className="text-[10px] px-3 py-1 rounded-full bg-bloom-100 text-bloom-700 hover:bg-bloom-200 font-sans flex items-center gap-1 transition-colors">
                  <HiOutlineCheckCircle size="11" /> Mark Replied
                </button>
              </div>
            </div>
          </motion.div>
        ))}
        {messages.length === 0 && <p className="text-center text-sm text-navy/30 font-sans py-12">No messages found</p>}
      </div>
    </div>
  );
}
