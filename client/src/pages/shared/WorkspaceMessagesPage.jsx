import { Archive, Ban, FileText, Flag, MessageSquare, Search, Send, ShieldAlert, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ActionModal from '../../components/ActionModal.jsx';
import CustomFileUpload from '../../components/ui/CustomFileUpload.jsx';
import CustomSelect from '../../components/ui/CustomSelect.jsx';
import { FormField, FormInput, FormTextarea } from '../../components/ui/FormField.jsx';
import { apiRequest } from '../../lib/api.js';
import { getSocket } from '../../lib/socket.js';

const reportReasons=[
  {value:'spam',label:'Spam or unwanted outreach'},
  {value:'harassment',label:'Harassment or abusive behaviour'},
  {value:'scam',label:'Scam or suspicious request'},
  {value:'impersonation',label:'Impersonation'},
  {value:'inappropriate_content',label:'Inappropriate content'},
  {value:'privacy',label:'Privacy concern'},
  {value:'other',label:'Other'},
];

export default function WorkspaceMessagesPage({role}){
  const base=`/${role}/messages`;
  const safetyBase=`/${role}/safety`;
  const [conversations,setConversations]=useState(null);
  const [active,setActive]=useState(null);
  const [messages,setMessages]=useState([]);
  const [body,setBody]=useState('');
  const [message,setMessage]=useState('');
  const [query,setQuery]=useState('');
  const [typing,setTyping]=useState('');
  const [attachment,setAttachment]=useState(null);
  const [attachmentFile,setAttachmentFile]=useState(null);
  const [sending,setSending]=useState(false);
  const [archived,setArchived]=useState(false);
  const [archiveTarget,setArchiveTarget]=useState(null);
  const [blockTarget,setBlockTarget]=useState(null);
  const [reportOpen,setReportOpen]=useState(false);
  const [reportReason,setReportReason]=useState('spam');
  const [reportDetails,setReportDetails]=useState('');
  const [safetyBusy,setSafetyBusy]=useState(false);
  const endRef=useRef(null);
  const typingTimer=useRef(null);
  const endpoint=`${base}${archived?'?archived=true':''}`;

  const loadConversations=useCallback(async()=>{
    try{
      const response=await apiRequest(endpoint);
      setConversations(response.conversations||[]);
    }catch(error){setMessage(error.message);}
  },[endpoint]);

  useEffect(()=>{
    let cancelled=false;
    apiRequest(endpoint).then((response)=>!cancelled&&setConversations(response.conversations||[])).catch((error)=>!cancelled&&setMessage(error.message));
    return()=>{cancelled=true;};
  },[endpoint]);

  useEffect(()=>{
    const socket=getSocket();
    socket.connect();
    const onNew=({conversationId,message:item})=>{
      if(String(active?._id)===String(conversationId))setMessages((current)=>current.some((entry)=>entry._id===item._id)?current:[...current,item]);
      loadConversations();
    };
    const onTyping=(event)=>{if(String(active?._id)===String(event.conversationId))setTyping(event.typing?`${event.name} is typing…`:'');};
    const onRead=({conversationId,readAt})=>{if(String(active?._id)===String(conversationId))setMessages((current)=>current.map((item)=>item.sender?.role===role&&!item.readAt?{...item,readAt}:item));};
    const onUpdated=()=>loadConversations();
    socket.on('message:new',onNew);
    socket.on('typing',onTyping);
    socket.on('messages:read',onRead);
    socket.on('conversation:updated',onUpdated);
    return()=>{
      socket.off('message:new',onNew);
      socket.off('typing',onTyping);
      socket.off('messages:read',onRead);
      socket.off('conversation:updated',onUpdated);
    };
  },[active?._id,loadConversations,role]);

  useEffect(()=>{endRef.current?.scrollIntoView({behavior:'smooth'});},[messages,typing]);
  useEffect(()=>()=>clearTimeout(typingTimer.current),[]);

  const counterpart=useCallback((item)=>role==='recruiter'?item.candidate:item.recruiter,[role]);

  const openConversation=async(item)=>{
    try{
      const socket=getSocket();
      if(active?._id)socket.emit('conversation:leave',active._id);
      socket.emit('conversation:join',item._id);
      const response=await apiRequest(`${base}/${item._id}`);
      setActive({...item,blocked:Boolean(response.blocked)});
      setTyping('');
      setMessages(response.messages||[]);
      await loadConversations();
    }catch(error){setMessage(error.message);}
  };

  const send=async(event)=>{
    event.preventDefault();
    if(!active||active.blocked||(!body.trim()&&!attachment)||sending)return;
    setSending(true);
    try{
      const response=await apiRequest(`${base}/${active._id}`,{method:'POST',body:JSON.stringify({body,attachment})});
      setBody('');
      setAttachment(null);
      setAttachmentFile(null);
      setMessages((current)=>current.some((item)=>item._id===response.item?._id)?current:[...current,response.item]);
      getSocket().emit('typing:stop',active._id);
      await loadConversations();
    }catch(error){setMessage(error.message);}finally{setSending(false);}
  };

  const onType=(value)=>{
    setBody(value);
    if(!active||active.blocked)return;
    const socket=getSocket();
    socket.emit('typing:start',active._id);
    clearTimeout(typingTimer.current);
    typingTimer.current=setTimeout(()=>socket.emit('typing:stop',active._id),900);
  };

  const chooseFile=(file)=>{
    setMessage('');
    if(!file){setAttachment(null);setAttachmentFile(null);return;}
    if(file.size>4*1024*1024){setMessage('Attachment must be 4 MB or smaller.');return;}
    if(!['application/pdf','image/jpeg','image/png','image/webp'].includes(file.type)){setMessage('Only PDF, JPG, PNG, and WebP attachments are allowed.');return;}
    const reader=new FileReader();
    reader.onload=()=>{setAttachment({name:file.name,dataUrl:String(reader.result)});setAttachmentFile(file);};
    reader.onerror=()=>setMessage('Unable to read this attachment.');
    reader.readAsDataURL(file);
  };

  const archive=async()=>{
    if(!archiveTarget)return;
    try{
      await apiRequest(`${base}/${archiveTarget._id}/archive`,{method:'PATCH'});
      if(active?._id===archiveTarget._id){getSocket().emit('conversation:leave',active._id);setActive(null);setMessages([]);}
      setArchiveTarget(null);
      await loadConversations();
    }catch(error){setMessage(error.message);}
  };

  const restore=async(item)=>{try{await apiRequest(`${base}/${item._id}/restore`,{method:'PATCH'});await loadConversations();}catch(error){setMessage(error.message);}};

  const block=async()=>{
    if(!blockTarget)return;
    setSafetyBusy(true);
    try{
      const person=counterpart(blockTarget);
      const response=await apiRequest(`${safetyBase}/blocks/${person._id}`,{method:'PUT',body:JSON.stringify({reason:'Blocked from messaging workspace.'})});
      setMessage(response.message);
      setBlockTarget(null);
      if(active?._id===blockTarget._id)setActive({...active,blocked:true});
      await loadConversations();
    }catch(error){setMessage(error.message);}finally{setSafetyBusy(false);}
  };

  const report=async()=>{
    if(!active)return;
    setSafetyBusy(true);
    try{
      const response=await apiRequest(`${safetyBase}/reports`,{method:'POST',body:JSON.stringify({targetType:'conversation',targetId:active._id,reason:reportReason,details:reportDetails})});
      setMessage(response.message);
      setReportOpen(false);
      setReportDetails('');
      setReportReason('spam');
    }catch(error){setMessage(error.message);}finally{setSafetyBusy(false);}
  };

  const filtered=useMemo(()=>{
    const normalized=query.trim().toLowerCase();
    return (conversations||[]).filter((item)=>{
      if(!normalized)return true;
      const person=counterpart(item);
      return `${person?.firstName||''} ${person?.lastName||''} ${item.job?.title||''} ${item.lastMessagePreview||''}`.toLowerCase().includes(normalized);
    });
  },[conversations,counterpart,query]);

  return <section className="space-y-6">
    <div className="rounded-[2rem] bg-slate-950 p-6 text-white sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#F3E8A2]">Realtime hiring conversations</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] sm:text-4xl">Messages</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">Keep recruiter-candidate conversations tied to job context, unread state, read receipts, attachments and safety controls instead of moving hiring decisions into disconnected channels.</p>
        </div>
        <Link to={`/${role}/safety`} className="inline-flex items-center gap-2 self-start rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10 sm:self-auto"><ShieldAlert size={15}/> Safety Center</Link>
      </div>
    </div>

    {message&&<div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600"><span>{message}</span><button type="button" onClick={()=>setMessage('')} className="grid size-8 place-items-center rounded-lg transition hover:bg-slate-100" aria-label="Dismiss"><X size={16}/></button></div>}

    <div className="grid min-h-[620px] overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
        <div className="space-y-3 border-b border-slate-100 p-4">
          <div className="flex items-center justify-between gap-3">
            <div><h3 className="font-semibold text-slate-950">Conversations</h3><p className="mt-0.5 text-[11px] text-slate-400">{archived?'Archived threads':'Active inbox'}</p></div>
            <button type="button" onClick={()=>{setArchived((value)=>!value);setActive(null);setMessages([]);}} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50 hover:text-emerald-700">{archived?'Back to inbox':'Archived'}</button>
          </div>
          <FormField label="Search conversations" className="!gap-1.5"><div className="relative"><Search size={15} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400"/><FormInput value={query} onChange={(event)=>setQuery(event.target.value)} maxLength="120" className="pl-10" placeholder="Name, role, or message…"/></div></FormField>
        </div>
        {!conversations?<State text="Loading conversations…"/>:filtered.length?<div className="max-h-[520px] divide-y divide-slate-100 overflow-y-auto">{filtered.map((item)=>{const person=counterpart(item);return <div key={item._id} className={`group relative transition ${active?._id===item._id?'bg-[#F3E8A2]/30':'hover:bg-emerald-50/40'}`}><button type="button" onClick={()=>openConversation(item)} className="w-full p-4 pr-12 text-left"><div className="flex items-center justify-between gap-2"><strong className="truncate text-sm text-slate-900">{person?.firstName} {person?.lastName}</strong>{item.blocked?<Ban size={14} className="text-rose-500"/>:item.unreadCount>0&&<span className="grid min-w-5 place-items-center rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{item.unreadCount}</span>}</div><p className="mt-1 truncate text-xs text-slate-500">{item.job?.title||'General conversation'}</p><p className="mt-2 truncate text-xs text-slate-400">{item.blocked?'Messaging blocked':item.lastMessagePreview||'No messages yet'}</p></button>{archived?<button type="button" onClick={()=>restore(item)} className="absolute right-3 top-4 rounded-lg px-2 py-1 text-[10px] font-bold text-indigo-700 transition hover:bg-white">Restore</button>:<button type="button" onClick={()=>setArchiveTarget(item)} className="absolute right-3 top-4 grid size-8 place-items-center rounded-lg text-slate-400 opacity-0 transition hover:bg-white hover:text-slate-700 focus:opacity-100 group-hover:opacity-100" aria-label="Archive conversation"><Archive size={14}/></button>}</div>})}</div>:<State text={archived?'No archived conversations.':role==='recruiter'?'Start a conversation from Candidate Search or an applicant profile.':'No recruiter conversations yet. When a recruiter contacts you, the thread will appear here.'}/>} 
      </aside>

      <div className="flex min-h-[500px] min-w-0 flex-col">
        {active?<>
          <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
            <div className="min-w-0"><h3 className="truncate font-semibold text-slate-950">{counterpart(active)?.firstName} {counterpart(active)?.lastName}</h3><p className="mt-1 truncate text-xs text-slate-500">{active.job?.title||'Hiring conversation'}</p></div>
            <div className="flex flex-wrap items-center gap-2">{active.job?.slug&&<Link to={`/jobs/${active.job.slug}`} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-indigo-700 transition hover:bg-indigo-50 hover:text-emerald-700">View role</Link>}<button type="button" onClick={()=>setReportOpen(true)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:-translate-y-0.5 hover:bg-slate-50"><Flag size={13}/>Report</button>{!active.blocked&&<button type="button" onClick={()=>setBlockTarget(active)} className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:-translate-y-0.5 hover:bg-rose-100"><Ban size={13}/>Block</button>}</div>
          </header>
          {active.blocked&&<div className="flex items-start gap-3 border-b border-rose-100 bg-rose-50 px-5 py-3 text-xs leading-5 text-rose-700"><ShieldAlert size={16} className="mt-0.5 shrink-0"/><span>Messaging is disabled because one of these accounts has blocked the other. Existing history remains available for safety and recordkeeping.</span></div>}
          <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4 sm:p-5">{messages.length?messages.map((item)=>{const mine=item.sender?.role===role;return <div key={item._id} className={`flex ${mine?'justify-end':'justify-start'}`}><div className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[72%] ${mine?'bg-slate-950 text-white':'border border-slate-200 bg-white text-slate-700'}`}>{item.body&&<p className="whitespace-pre-wrap break-words">{item.body}</p>}{item.attachment&&<a href={item.attachment.url} target="_blank" rel="noreferrer" className={`mt-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${mine?'bg-white/10 text-white hover:bg-white/15':'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}><FileText size={15}/><span className="truncate">{item.attachment.name}</span></a>}<span className="mt-1 flex items-center justify-end gap-2 text-[10px] text-slate-400">{new Date(item.createdAt).toLocaleString()}{mine&&<span>{item.readAt?'Read':'Sent'}</span>}</span></div></div>}):<div className="grid min-h-56 place-items-center text-center"><div><MessageSquare size={26} className="mx-auto text-slate-300"/><p className="mt-3 text-sm text-slate-500">No messages yet. Start the conversation when you are ready.</p></div></div>}{typing&&!active.blocked&&<p className="text-xs font-medium text-slate-400">{typing}</p>}<div ref={endRef}/></div>
          <form onSubmit={send} className="border-t border-slate-200 bg-white p-4">
            {attachment&&<div className="mb-3 flex items-center justify-between gap-3 rounded-xl bg-slate-100 px-3 py-2 text-xs text-slate-600"><span className="truncate">Attached: {attachment.name}</span><button type="button" onClick={()=>{setAttachment(null);setAttachmentFile(null);}} className="grid size-7 place-items-center rounded-lg transition hover:bg-white" aria-label="Remove attachment"><X size={14}/></button></div>}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="sm:w-48"><CustomFileUpload label="Attachment" hint="PDF/JPG/PNG/WebP · 4 MB" accept="application/pdf,image/jpeg,image/png,image/webp" file={attachmentFile} onChange={chooseFile} disabled={active.blocked||sending}/></div>
              <div className="min-w-0 flex-1"><FormField label="Message" hint={`${body.length}/4000 characters`}><FormTextarea disabled={active.blocked} rows={3} maxLength="4000" value={body} onChange={(event)=>onType(event.target.value)} placeholder={active.blocked?'Messaging unavailable':'Write a message…'} /></FormField></div>
              <button disabled={active.blocked||sending||(!body.trim()&&!attachment)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#E3A341] px-5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50" aria-label="Send message"><Send size={18}/>{sending?'Sending…':'Send'}</button>
            </div>
          </form>
        </>:<div className="grid flex-1 place-items-center p-10 text-center"><div><MessageSquare size={30} className="mx-auto text-slate-300"/><h3 className="mt-3 font-semibold text-slate-800">Choose a conversation</h3><p className="mt-1 text-sm text-slate-500">Open a thread to view history, send attachments, review read state, or use safety controls.</p></div></div>}
      </div>
    </div>

    <ActionModal open={Boolean(archiveTarget)} title="Archive conversation?" description="It will move out of your inbox, but the message history is preserved and can be restored later." confirmLabel="Archive" onClose={()=>setArchiveTarget(null)} onConfirm={archive}/>
    <ActionModal open={Boolean(blockTarget)} title="Block this user?" description="Neither side will be able to send new messages while this block exists. Existing message history is preserved." confirmLabel="Block user" tone="danger" onClose={()=>!safetyBusy&&setBlockTarget(null)} onConfirm={block} busy={safetyBusy}/>
    <ActionModal open={reportOpen} title="Report conversation" description="Reports are reviewed by the platform moderation team. Include enough detail for the report to be assessed." confirmLabel="Submit report" onClose={()=>!safetyBusy&&setReportOpen(false)} onConfirm={report} busy={safetyBusy}><div className="grid gap-4"><CustomSelect label="Reason" value={reportReason} onChange={setReportReason} options={reportReasons}/><FormField label="Details" hint={`${reportDetails.length}/2000 characters`}><FormTextarea value={reportDetails} onChange={(event)=>setReportDetails(event.target.value)} maxLength="2000" rows={4} placeholder="Describe what happened…"/></FormField></div></ActionModal>
  </section>;
}

function State({text}){return <div className="p-8 text-center text-sm leading-6 text-slate-500">{text}</div>}
