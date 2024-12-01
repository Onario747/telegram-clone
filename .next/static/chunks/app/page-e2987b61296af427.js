(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{7033:function(e,s,a){Promise.resolve().then(a.bind(a,5031))},7384:function(e,s,a){"use strict";a.d(s,{F:function(){return o},ThemeProvider:function(){return r}});var t=a(7437),n=a(2265);let i=(0,n.createContext)();function r(e){let{children:s}=e,[a,r]=(0,n.useState)(!0);return(0,n.useEffect)(()=>{let e=localStorage.getItem("theme");e?r("dark"===e):r(window.matchMedia("(prefers-color-scheme: dark)").matches)},[]),(0,t.jsx)(i.Provider,{value:{isDarkMode:a,toggleTheme:()=>{r(!a),localStorage.setItem("theme",a?"light":"dark")}},children:s})}let o=()=>(0,n.useContext)(i)},5031:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return Q}});var t=a(7437),n=a(2265),i=a(3464),r=a(8614),o=a(9064),l=a(5790),c=a(7384),d=a(6126),u=a.n(d),h=a(3145);function g(e){let{phoneNumber:s,verificationCode:a,sessionData:n,loading:i,loginStep:r,onPhoneNumberChange:o,onVerificationCodeChange:d,onInitiateLogin:g,onVerifyCode:m,onBackToPhone:_}=e,{isDarkMode:p}=(0,c.F)();return(0,t.jsxs)(l.E.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},className:"".concat(u().loginContainer," ").concat(p?u().dark:u().light),children:[(0,t.jsxs)("div",{className:u().loginHeader,children:[(0,t.jsx)(h.default,{src:"/telegram-logo.svg",alt:"Telegram Logo",className:u().logo,width:120,height:120,priority:!0}),(0,t.jsx)("h1",{children:"Sign in to Telegram"}),(0,t.jsx)("p",{children:"Please confirm your country code and enter your phone number."})]}),"phone"===r?(0,t.jsxs)("div",{className:u().phoneStep,children:[(0,t.jsx)("h2",{children:"Enter your phone number"}),(0,t.jsx)("div",{className:u().inputGroup,children:(0,t.jsx)("input",{type:"tel",value:s,onChange:e=>{o(e.target.value.replace(/[^\d\s+]/g,""))},placeholder:"+1 234 567 8900",disabled:i,className:u().phoneInput,maxLength:15})}),(0,t.jsx)("button",{onClick:g,disabled:i||!s||s.length<10,className:u().submitButton,children:i?"Sending...":"Send Code"})]}):(0,t.jsxs)("div",{className:u().codeStep,children:[(0,t.jsx)("h2",{children:"Enter verification code"}),(0,t.jsx)("div",{className:u().inputGroup,children:(0,t.jsx)("input",{type:"text",value:a,onChange:e=>{d(e.target.value.replace(/\D/g,""))},placeholder:"Enter code",disabled:i,className:u().phoneInput,maxLength:5})}),(0,t.jsxs)("p",{className:u().phoneNumber,children:["Code sent to ",s]}),(0,t.jsxs)("div",{className:u().buttonGroup,children:[(0,t.jsx)("button",{onClick:_,disabled:i,className:u().backButton,children:"Back"}),(0,t.jsx)("button",{onClick:m,disabled:i||!a,className:u().submitButton,children:i?"Verifying...":"Verify"})]})]})]})}var m=a(7996),_=a(1360),p=a.n(_);function x(e){let{value:s,onChange:a,onSearch:i}=e,[r,o]=(0,n.useState)(!1);return(0,t.jsx)("div",{className:p().searchBar,children:(0,t.jsxs)("div",{className:p().searchInput,children:[(0,t.jsx)(m.jRj,{className:p().searchIcon}),(0,t.jsx)("input",{type:"text",value:s,onChange:e=>{a(e.target.value),r||o(!0)},onKeyDown:e=>{"Enter"===e.key&&(i(),o(!1))},onBlur:()=>{r&&(i(),o(!1))},placeholder:"Search chats and users..."})]})})}function v(e){let{users:s,channels:a,onSelect:n,onlineUsers:i}=e,r=e=>e?e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2):"?";return(0,t.jsxs)("div",{className:p().searchResults,children:[s.length>0&&(0,t.jsxs)("div",{className:p().searchSection,children:[(0,t.jsx)("h3",{className:p().searchSectionTitle,children:"Users"}),s.map(e=>{var s;return(0,t.jsxs)(l.E.div,{className:p().searchResultItem,onClick:()=>n(e),initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[(null===(s=e.profilePictures)||void 0===s?void 0:s[0])?(0,t.jsx)("img",{src:e.profilePictures[0].fileReference,alt:e.username,className:p().profileImage,onError:e=>{e.target.style.display="none",e.target.nextSibling.style.display="flex"}}):(0,t.jsx)("div",{className:p().profileImagePlaceholder,children:r("".concat(e.firstName," ").concat(e.lastName))}),(0,t.jsxs)("div",{className:p().chatInfo,children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:p().username,children:[e.firstName," ",e.lastName]}),(0,t.jsx)("div",{className:p().lastMessage,children:e.username?"@".concat(e.username):e.phone})]}),i.has(e.id)&&(0,t.jsx)("div",{className:p().onlineIndicator})]})]},e.id)})]}),a.length>0&&(0,t.jsxs)("div",{className:p().searchSection,children:[(0,t.jsx)("h3",{className:p().searchSectionTitle,children:"Channels"}),a.map(e=>(0,t.jsxs)(l.E.div,{className:p().searchResultItem,onClick:()=>n({...e,type:"Channel"}),initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[e.channelPicture?(0,t.jsx)("img",{src:e.channelPicture.fileReference,alt:e.title,className:p().profileImage,onError:e=>{e.target.style.display="none",e.target.nextSibling.style.display="flex"}}):(0,t.jsx)("div",{className:p().profileImagePlaceholder,children:r(e.title)}),(0,t.jsx)("div",{className:p().chatInfo,children:(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:p().username,children:e.title}),(0,t.jsxs)("div",{className:p().lastMessage,children:[e.username?"@".concat(e.username):""," • ",e.participants.toLocaleString()," members"]})]})})]},e.id))]}),0===s.length&&0===a.length&&(0,t.jsx)("div",{className:p().noResults,children:"No results found"})]})}function f(e){let{searchQuery:s,searchResults:a,onlineUsers:n,chatList:i,onSearchQueryChange:r,onSearch:o,onChatSelect:d,onRefreshChats:u,onLogout:h,onMenuClick:g}=e,{isDarkMode:_}=(0,c.F)(),f=e=>e?e.split(" ").map(e=>e[0]).join("").toUpperCase().slice(0,2):"?";return(0,t.jsxs)("div",{className:"".concat(p().sidebar," ").concat(_?p().dark:p().light),children:[(0,t.jsxs)("div",{className:p().sidebarHeader,children:[(0,t.jsxs)("div",{className:p().headerTop,children:[(0,t.jsx)("button",{className:p().menuButton,onClick:g,children:(0,t.jsx)(m.cur,{size:24})}),(0,t.jsx)("h2",{children:"Telegram"})]}),(0,t.jsx)(x,{value:s,onChange:r,onSearch:o}),(0,t.jsx)("button",{className:p().logoutButton,onClick:h,children:"Logout"})]}),s?(0,t.jsx)(v,{users:a.users,channels:a.channels,onSelect:d,onlineUsers:n}):(0,t.jsx)("div",{className:p().chatList,children:i.map(e=>(0,t.jsxs)(l.E.div,{className:p().chatItem,onClick:()=>d(e),initial:{opacity:0,y:10},animate:{opacity:1,y:0},transition:{duration:.2},children:[e.profileImage?(0,t.jsx)("img",{src:e.profileImage,alt:e.username,className:p().profileImage,onError:e=>{e.target.style.display="none",e.target.nextSibling.style.display="flex"}}):(0,t.jsx)("div",{className:p().profileImagePlaceholder,children:f(e.username)}),(0,t.jsxs)("div",{className:p().chatInfo,children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("div",{className:p().username,children:e.username}),e.latestMessage&&(0,t.jsx)("div",{className:p().lastMessage,children:e.latestMessage.text||"No messages yet"})]}),e.unreadMessagesCount>0&&(0,t.jsx)("span",{className:p().unreadBadge,children:e.unreadMessagesCount})]})]},e.chatRoomId))})]})}var j=a(6424),S=a(4949),b=a.n(S);function C(e){let{message:s,onReact:a}=e,[i,r]=(0,n.useState)(!1),o=!s.fromId;return(0,t.jsxs)(l.E.div,{className:"".concat(b().messageContainer," ").concat(o?b().sent:b().received),initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},children:[(0,t.jsxs)("div",{className:b().messageContent,children:[(0,t.jsx)("div",{className:b().messageText,children:(e=>{try{return new URL(e),!0}catch(e){return!1}})(s.message)?(0,t.jsx)("a",{href:s.message,target:"_blank",rel:"noopener noreferrer",className:b().messageLink,children:s.message}):s.message}),(0,t.jsx)("div",{className:b().messageInfo,children:(0,t.jsx)("span",{className:b().messageTime,children:s.date&&(e=>{let s=new Date(1e3*e);return(0,j.WU)(s,"HH:mm")})(s.date)})})]}),(0,t.jsx)("button",{className:b().optionsButton,onClick:()=>r(!i),children:(0,t.jsx)(m.K9M,{})}),i&&(0,t.jsxs)(l.E.div,{className:b().optionsMenu,initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},exit:{opacity:0,scale:.95},children:[(0,t.jsx)("button",{onClick:()=>a(s.id,"\uD83D\uDC4D"),children:"\uD83D\uDC4D"}),(0,t.jsx)("button",{onClick:()=>a(s.id,"❤️"),children:"❤️"}),(0,t.jsx)("button",{onClick:()=>a(s.id,"\uD83D\uDE02"),children:"\uD83D\uDE02"}),(0,t.jsx)("button",{onClick:()=>a(s.id,"\uD83D\uDE2E"),children:"\uD83D\uDE2E"}),(0,t.jsx)("button",{onClick:()=>a(s.id,"\uD83D\uDE22"),children:"\uD83D\uDE22"}),(0,t.jsx)("button",{onClick:()=>a(s.id,"\uD83D\uDC4E"),children:"\uD83D\uDC4E"})]})]})}var y=a(2768),N=a(4320),k=a.n(N);function I(e){let{value:s,onChange:a,onSend:n}=e;return(0,t.jsxs)("div",{className:k().messageInput,children:[(0,t.jsx)("button",{className:k().emojiButton,children:(0,t.jsx)(y.HxL,{})}),(0,t.jsx)("input",{type:"text",value:s,onChange:e=>a(e.target.value),placeholder:"Type a message...",className:k().input,onKeyUp:e=>"Enter"===e.key&&n()}),(0,t.jsx)("button",{onClick:n,className:k().sendButton,children:(0,t.jsx)(y.yhK,{})})]})}var B=a(967),M=a.n(B);function P(e){let{chat:s,onBackClick:a,onMenuClick:n,isMobile:i}=e;return(0,t.jsxs)("div",{className:M().chatHeader,children:[i&&(0,t.jsx)("button",{className:M().backButton,onClick:a,children:(0,t.jsx)(m.Ao2,{size:24})}),(0,t.jsxs)("div",{className:M().chatInfo,children:[s.profileImage?(0,t.jsx)("img",{src:s.profileImage,alt:s.username,className:M().chatAvatar}):(0,t.jsx)("div",{className:M().chatAvatarPlaceholder,children:s.username[0].toUpperCase()}),(0,t.jsxs)("div",{className:M().chatDetails,children:[(0,t.jsx)("h2",{children:s.username}),(0,t.jsx)("p",{children:"Channel"===s.type?"Channel":"User"})]})]}),(0,t.jsx)("button",{className:M().menuButton,onClick:n,children:(0,t.jsx)(m.cur,{size:24})})]})}var w=a(917),A=a.n(w);function D(e){let{onFileSelect:s}=e,a=(0,n.useRef)(null);return(0,t.jsxs)("div",{className:A().fileUpload,children:[(0,t.jsx)("button",{onClick:()=>{var e;null===(e=a.current)||void 0===e||e.click()},className:A().uploadButton,children:(0,t.jsx)(y.T24,{})}),(0,t.jsx)("input",{type:"file",ref:a,onChange:e=>{var a;let t=null===(a=e.target.files)||void 0===a?void 0:a[0];t&&s(t)},style:{display:"none"},accept:"image/*,audio/*,video/*,application/*"})]})}var E=a(4966),T=a.n(E);function L(e){let{isRecording:s,onStartRecording:a,onStopRecording:i}=e,r=(0,n.useRef)(null),o=(0,n.useRef)([]),[l,c]=(0,n.useState)(0),d=(0,n.useRef)(null),u=async()=>{try{let e=await navigator.mediaDevices.getUserMedia({audio:!0});r.current=new MediaRecorder(e),r.current.ondataavailable=e=>{o.current.push(e.data)},r.current.onstop=()=>{let s=new Blob(o.current,{type:"audio/webm"});o.current=[],i(s),e.getTracks().forEach(e=>e.stop()),clearInterval(d.current),c(0)},r.current.start(),a(),d.current=setInterval(()=>{c(e=>e+1)},1e3)}catch(e){console.error("Error accessing microphone:",e)}};return(0,t.jsxs)("div",{className:T().voiceRecorder,children:[(0,t.jsx)("button",{className:"".concat(T().recordButton," ").concat(s?T().recording:""),onClick:s?()=>{var e;(null===(e=r.current)||void 0===e?void 0:e.state)==="recording"&&r.current.stop()}:u,children:s?(0,t.jsx)(y.Wcw,{}):(0,t.jsx)(y.zXg,{})}),s&&(0,t.jsx)("span",{className:T().duration,children:"".concat(Math.floor(l/60),":").concat((l%60).toString().padStart(2,"0"))})]})}var R=a(4785),Z=a.n(R),V=a(6923),H=a.n(V);function U(e){let{chatId:s,onEnd:a}=e,i=(0,n.useRef)(null),r=(0,n.useRef)(null),o=(0,n.useRef)(null),[l,c]=(0,n.useState)(!1),[d,u]=(0,n.useState)(!1);(0,n.useEffect)(()=>(h(),()=>{g()}),[]);let h=async()=>{try{let e=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0});i.current&&(i.current.srcObject=e),o.current=new RTCPeerConnection({iceServers:[{urls:"stun:stun.l.google.com:19302"}]}),e.getTracks().forEach(s=>{o.current.addTrack(s,e)}),o.current.ontrack=e=>{r.current&&(r.current.srcObject=e.streams[0])}}catch(e){console.error("Error accessing media devices:",e)}},g=()=>{var e,s;(null===(e=i.current)||void 0===e?void 0:e.srcObject)&&i.current.srcObject.getTracks().forEach(e=>e.stop()),null===(s=o.current)||void 0===s||s.close()};return(0,t.jsxs)("div",{className:H().videoCall,children:[(0,t.jsxs)("div",{className:H().controls,children:[(0,t.jsx)("button",{onClick:()=>{var e;(null===(e=i.current)||void 0===e?void 0:e.srcObject)&&(i.current.srcObject.getAudioTracks().forEach(e=>{e.enabled=!e.enabled}),c(!l))},className:H().controlButton,children:l?(0,t.jsx)(y.qL9,{}):(0,t.jsx)(y.zXg,{})}),(0,t.jsx)("button",{onClick:()=>{var e;(null===(e=i.current)||void 0===e?void 0:e.srcObject)&&(i.current.srcObject.getVideoTracks().forEach(e=>{e.enabled=!e.enabled}),u(!d))},className:H().controlButton,children:d?(0,t.jsx)(y.S7p,{}):(0,t.jsx)(y.giN,{})}),(0,t.jsx)("button",{onClick:a,className:H().endCall,children:(0,t.jsx)(y.bjh,{})})]}),(0,t.jsxs)("div",{className:H().videos,children:[(0,t.jsx)(Z(),{ref:i,mirrored:!0,className:H().localVideo,audio:!1}),(0,t.jsx)("video",{ref:r,className:H().remoteVideo,autoPlay:!0,playsInline:!0})]})]})}function F(e){let{selectedChat:s,messages:a,loading:i,hasMore:r,onLoadMore:o,onSendMessage:l,onSendFile:d,onSendVoice:u,onBackClick:h,onMenuClick:g,isMobile:m,onReactToMessage:_,onInitiateVideoCall:p}=e,{isDarkMode:x}=(0,c.F)(),[v,f]=(0,n.useState)(""),[j,S]=(0,n.useState)(!1),[b,y]=(0,n.useState)(!1),N=(0,n.useRef)(null),k=(0,n.useRef)(null),B=()=>{var e;null===(e=N.current)||void 0===e||e.scrollIntoView({behavior:"smooth"})};return((0,n.useEffect)(()=>{B()},[a]),s)?(0,t.jsxs)("div",{className:"".concat(M().chatArea," ").concat(x?M().dark:M().light),children:[(0,t.jsx)(P,{chat:s,onBackClick:h,onMenuClick:g,isMobile:m}),(0,t.jsxs)("div",{className:M().messagesContainer,ref:k,onScroll:e=>{let{scrollTop:s}=e.target;s<100&&r&&!i&&o()},children:[i&&(0,t.jsx)("div",{className:M().loadingIndicator,children:"Loading messages..."}),a.map(e=>(0,t.jsx)(C,{message:e,onReact:_},e.id)),(0,t.jsx)("div",{ref:N})]}),(0,t.jsxs)("div",{className:M().inputArea,children:[(0,t.jsx)(D,{onFileSelect:d}),(0,t.jsx)(I,{value:v,onChange:f,onSend:()=>{v.trim()&&(l(v),f(""))}}),(0,t.jsx)(L,{isRecording:j,onStartRecording:()=>S(!0),onStopRecording:e=>{S(!1),u(e)}})]}),b&&(0,t.jsx)(U,{chatId:s.id,onEnd:()=>y(!1)})]}):(0,t.jsx)("div",{className:"".concat(M().noChatSelected," ").concat(x?M().dark:M().light),children:(0,t.jsxs)("div",{className:M().noChatContent,children:[(0,t.jsx)("h2",{children:"Select a chat to start messaging"}),(0,t.jsx)("p",{children:"Choose from your existing conversations or start a new one"})]})})}a(257);var z=a(8145),O=a.n(z),G=a(8751),J=a.n(G);function X(e){let{onClose:s,onLogout:a}=e,{isDarkMode:n,toggleTheme:i}=(0,c.F)(),r=[{icon:(0,t.jsx)(m.fzv,{size:20}),label:"Profile",onClick:()=>console.log("Profile clicked")},{icon:(0,t.jsx)(m.nbt,{size:20}),label:"General Settings",onClick:()=>console.log("Settings clicked")},{icon:n?(0,t.jsx)(m.kXG,{size:20}):(0,t.jsx)(m.wOW,{size:20}),label:"Theme",onClick:i},{icon:(0,t.jsx)(m.bax,{size:20}),label:"Help",onClick:()=>console.log("Help clicked")},{icon:(0,t.jsx)(m.H33,{size:20}),label:"About",onClick:()=>console.log("About clicked")},{icon:(0,t.jsx)(m.mW3,{size:20}),label:"Saved Messages",onClick:()=>console.log("Saved Messages clicked")}];return(0,t.jsxs)(l.E.div,{className:J().settingsPanel,initial:{x:"-100%"},animate:{x:0},exit:{x:"-100%"},transition:{type:"tween",duration:.3},children:[(0,t.jsxs)("div",{className:J().settingsHeader,children:[(0,t.jsx)("h2",{children:"Settings"}),(0,t.jsx)("button",{onClick:s,children:(0,t.jsx)(m.q5L,{size:24})})]}),(0,t.jsxs)("div",{className:J().settingsContent,children:[r.map((e,s)=>(0,t.jsxs)("button",{className:J().settingsItem,onClick:e.onClick,children:[e.icon,(0,t.jsx)("span",{children:e.label})]},s)),(0,t.jsx)("button",{className:"".concat(J().settingsItem," ").concat(J().logoutButton),onClick:a,children:"Logout"})]})]})}let W="https://xelegram.onrender.com";function K(){let[e,s]=(0,n.useState)(!1),[a,l]=(0,n.useState)(""),[c,d]=(0,n.useState)(""),[u,h]=(0,n.useState)(()=>{{let e=localStorage.getItem("telegramSession");return e?JSON.parse(e):null}}),[m,_]=(0,n.useState)(""),[p,x]=(0,n.useState)({users:[],channels:[]}),[v,j]=(0,n.useState)(null),[S,b]=(0,n.useState)([]),[C,y]=(0,n.useState)(!1),[N,k]=(0,n.useState)(new Set),[I,B]=(0,n.useState)("phone"),[M,P]=(0,n.useState)([]),[w,A]=(0,n.useState)(!1),[D,E]=(0,n.useState)(!0),[T,L]=(0,n.useState)(0),[R,Z]=(0,n.useState)(!1),[V,H]=(0,n.useState)(!1),[U,z]=(0,n.useState)(!0);(0,n.useEffect)(()=>{(async()=>{let e=localStorage.getItem("telegramSession");if(e){let a=JSON.parse(e);try{let e=await i.Z.post("".concat(W,"/t/api/refresh"),{sessionString:a.sessionString});if(e.data.sessionString){let t={...a,sessionString:e.data.sessionString};h(t),localStorage.setItem("telegramSession",JSON.stringify(t)),s(!0),await $()}}catch(e){localStorage.removeItem("telegramSession"),h(null),s(!1)}}})()},[]),(0,n.useEffect)(()=>{u?localStorage.setItem("telegramSession",JSON.stringify(u)):localStorage.removeItem("telegramSession")},[u]);let G=async()=>{let e=o.ZP.loading("Sending verification code...");try{y(!0);let s=await i.Z.post("".concat(W,"/t/api/initiate"),{phoneNumber:a});if(s.data.response){let{phoneCodeHash:a,sessionString:t}=s.data.response;h({phoneCodeHash:a,sessionString:t}),B("code"),o.ZP.success("Verification code sent successfully!",{id:e})}}catch(n){var s,t;let a=(null===(t=n.response)||void 0===t?void 0:null===(s=t.data)||void 0===s?void 0:s.error)||"Failed to send verification code";console.error("Login initiation failed:",a),o.ZP.error(a,{id:e})}finally{y(!1)}},J=async()=>{let e=o.ZP.loading("Verifying code...");try{if(y(!0),!u)throw Error("Session data is missing");let{phoneCodeHash:t,sessionString:n}=u,r=await i.Z.post("".concat(W,"/t/api/verify"),{phoneNumber:a,phoneCodeHash:t,sessionString:n,phoneCode:c});if(r.data.sessionString){let t={...u,sessionString:r.data.sessionString,phoneNumber:a};h(t),localStorage.setItem("telegramSession",JSON.stringify(t)),s(!0),o.ZP.success("Successfully logged in!",{id:e}),await $()}}catch(a){var t,n;let s=(null===(n=a.response)||void 0===n?void 0:null===(t=n.data)||void 0===t?void 0:t.error)||"Verification failed";console.error("Verification failed:",s),o.ZP.error(s,{id:e})}finally{y(!1)}},K=async()=>{if(!(null==u?void 0:u.sessionString)||!m.trim())return;let e=o.ZP.loading("Searching...");try{let[t,n]=await Promise.all([i.Z.post("".concat(W,"/t/api/search"),{sessionString:u.sessionString,searchQuery:m.trim()}),i.Z.post("".concat(W,"/t/api/channel/search"),{sessionString:u.sessionString,searchQuery:m.trim()})]);if(t.data.users||n.data.channels){var s,a;x({users:t.data.users||[],channels:n.data.channels||[]});let i=((null===(s=t.data.users)||void 0===s?void 0:s.length)||0)+((null===(a=n.data.channels)||void 0===a?void 0:a.length)||0);i>0?o.ZP.success("Found ".concat(i," result").concat(1===i?"":"s"),{id:e}):o.ZP.error("No results found",{id:e})}}catch(e){await et(e,"Search failed")?await K():x({users:[],channels:[]})}},Q=async e=>{if(!v||!(null==u?void 0:u.sessionString)||!e.trim())return;let s=o.ZP.loading("Sending message...");try{if(("Channel"===v.type?await i.Z.post("".concat(W,"/t/api/channel/message"),{sessionString:u.sessionString,channelUsername:v.username,messageText:e.trim()}):await i.Z.post("".concat(W,"/t/api/user/message"),{sessionString:u.sessionString,destination:v.username||v.phone,messageText:e.trim()})).data){let a={id:Date.now(),message:e.trim(),date:Math.floor(Date.now()/1e3),fromId:null,peerId:{userId:v.id,className:"Channel"===v.type?"PeerChannel":"PeerUser"}};b(e=>[...e,a]),o.ZP.success("Message sent!",{id:s}),await ee(v)}}catch(s){await et(s,"Failed to send message")&&await Q(e)}},q=async e=>{o.ZP.error("File sending feature is coming soon!"),console.log("File to be sent:",e)},Y=async e=>{o.ZP.error("Voice message feature is coming soon!"),console.log("Voice message to be sent:",e)},$=async()=>{if(!(null==u?void 0:u.sessionString))return;let e=o.ZP.loading("Loading chats...");try{let s=await i.Z.post("".concat(W,"/t/api/chats"),{sessionString:u.sessionString});s.data.chatList&&(P(s.data.chatList),o.ZP.success("Chats loaded successfully",{id:e}))}catch(e){et(e,"Failed to load chats")}},ee=async function(e){let s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(!(null==u?void 0:u.sessionString)||!e)return;A(!0);let a=o.ZP.loading("Loading messages...");try{var t;let n;switch(e.type){case"Channel":n=await i.Z.post("".concat(W,"/t/api/channel/messages"),{sessionString:u.sessionString,channelUsername:e.username,messageIds:[],limit:50,offset:s});break;case"User":n=await i.Z.post("".concat(W,"/t/api/user/messages"),{sessionString:u.sessionString,userUsername:e.username,limit:50,offset:s});break;case"ChatForbidden":o.ZP.error("This chat is not accessible"),A(!1);return;default:o.ZP.error("Unsupported chat type"),A(!1);return}(null==n?void 0:null===(t=n.data)||void 0===t?void 0:t.messages)&&(0===s?b(n.data.messages):b(e=>[...e,...n.data.messages]),E(50===n.data.messages.length),o.ZP.success("Messages loaded",{id:a}))}catch(a){await et(a,"Failed to load messages")&&await ee(e,s)}finally{A(!1)}},es=async()=>{if(w||!D||!v)return;let e=T+50;L(e),await ee(v,e)};(0,n.useEffect)(()=>{v&&(b([]),L(0),E(!0),ee(v))},[null==v?void 0:v.username]);let ea=(0,n.useCallback)(()=>{s(!1),h(null),b([]),P([]),j(null),localStorage.removeItem("telegramSession"),o.ZP.success("Logged out successfully")},[]),et=(0,n.useCallback)(async(e,s)=>{var a;if((null===(a=e.response)||void 0===a?void 0:a.status)===401&&(null==u?void 0:u.sessionString)){if(await en(u.sessionString))return!0;ea(),o.ZP.error("Session expired. Please log in again.")}else o.ZP.error(s);return!1},[null==u?void 0:u.sessionString,ea]);(0,n.useEffect)(()=>{let e=()=>{H(window.innerWidth<=768)};return e(),window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]);let en=async e=>{try{let s=await i.Z.post("".concat(W,"/t/api/refresh"),{sessionString:e});if(s.data.sessionString)return h(e=>({...e,sessionString:s.data.sessionString})),!0;return!1}catch(e){return console.error("Session refresh failed:",e),!1}};return(0,n.useEffect)(()=>{let s;return e&&(null==u?void 0:u.sessionString)&&(s=setInterval(async()=>{await en(u.sessionString)||(ea(),o.ZP.error("Session expired. Please log in again."))},18e5)),()=>{s&&clearInterval(s)}},[e,null==u?void 0:u.sessionString,ea]),(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:O().container,children:[(0,t.jsx)(r.M,{children:e?(0,t.jsxs)("div",{className:O().chatContainer,children:[(0,t.jsx)("div",{className:"\n                ".concat(O().sidebarMobile,"\n                ").concat(!U&&V?O().sidebarHidden:"","\n              "),children:(0,t.jsx)(f,{searchQuery:m,searchResults:p,onlineUsers:N,chatList:M,onSearchQueryChange:_,onSearch:K,onChatSelect:e=>{if("ChatForbidden"===e.type){o.ZP.error("This chat is not accessible");return}j(e),b([]),L(0),E(!0),ee(e),V&&z(!1)},onRefreshChats:$,onMenuClick:()=>Z(!0),isMobile:V})}),(0,t.jsx)("div",{className:"\n                ".concat(O().chatAreaMobile,"\n                ").concat(U&&V?O().chatAreaHidden:"","\n              "),children:(0,t.jsx)(F,{selectedChat:v,messages:S,loading:w,hasMore:D,onLoadMore:es,onSendMessage:Q,onSendFile:q,onSendVoice:Y,onBackClick:()=>z(!0),onMenuClick:()=>Z(!0),isMobile:V,onReactToMessage:(e,s)=>{o.ZP.error("Reactions are not implemented yet")},onInitiateVideoCall:e=>{o.ZP.error("Video calls are not implemented yet")}})})]}):(0,t.jsx)(g,{phoneNumber:a,verificationCode:c,sessionData:u,loading:C,loginStep:I,onPhoneNumberChange:l,onVerificationCodeChange:d,onInitiateLogin:G,onVerifyCode:J,onBackToPhone:()=>B("phone")})}),(0,t.jsx)(r.M,{children:R&&(0,t.jsx)(X,{onClose:()=>Z(!1),onLogout:ea})})]})})}function Q(){return(0,t.jsx)(K,{})}},967:function(e){e.exports={chatArea:"ChatArea_chatArea__SAve1",chatHeader:"ChatArea_chatHeader__pybJr",backButton:"ChatArea_backButton__L_vZX",chatInfo:"ChatArea_chatInfo__CIswl",chatAvatar:"ChatArea_chatAvatar__sl4_5",chatAvatarPlaceholder:"ChatArea_chatAvatarPlaceholder___4CmW",chatDetails:"ChatArea_chatDetails__29Ouh",menuButton:"ChatArea_menuButton__YOCPo",messagesContainer:"ChatArea_messagesContainer__N2Gd_",loadingIndicator:"ChatArea_loadingIndicator__Xanqo",inputArea:"ChatArea_inputArea__Bn5UA",messageInput:"ChatArea_messageInput__59ifs",actionButton:"ChatArea_actionButton__y4TDo",noChatSelected:"ChatArea_noChatSelected__0D9rU",noChatContent:"ChatArea_noChatContent__psnIV",dark:"ChatArea_dark__PBMJ_",light:"ChatArea_light__8LSTl"}},4949:function(e){e.exports={messageContainer:"MessageBubble_messageContainer__7eT1e",fadeIn:"MessageBubble_fadeIn__CpxTl",sent:"MessageBubble_sent__82yjn",received:"MessageBubble_received__prWZO",messageContent:"MessageBubble_messageContent__c63cT",messageText:"MessageBubble_messageText__J3cE1",messageInfo:"MessageBubble_messageInfo__hw7xn",messageTime:"MessageBubble_messageTime__Nd4Bx",optionsButton:"MessageBubble_optionsButton__sN6_E",optionsMenu:"MessageBubble_optionsMenu__ARkl0",messageLink:"MessageBubble_messageLink__xLIun",dark:"MessageBubble_dark__2Z8j9",light:"MessageBubble_light__g2bJR"}},4320:function(e){e.exports={messageInput:"MessageInput_messageInput__k6nqk",emojiButton:"MessageInput_emojiButton__RjejF",input:"MessageInput_input__T1DdI",sendButton:"MessageInput_sendButton__X_Nn_"}},6126:function(e){e.exports={loginContainer:"Login_loginContainer__AF_Bs",loginHeader:"Login_loginHeader__lWFuw",logo:"Login_logo__j51Od",phoneStep:"Login_phoneStep__tkfqg",codeStep:"Login_codeStep__x_D_G",inputGroup:"Login_inputGroup__kLVtJ",phoneInput:"Login_phoneInput__6AkKa",buttonGroup:"Login_buttonGroup___6VYo",submitButton:"Login_submitButton__TggZf",backButton:"Login_backButton__1Ii5r",dark:"Login_dark__7o_r6",light:"Login_light__v0DcV"}},8751:function(e){e.exports={settingsPanel:"Settings_settingsPanel__VGrzR",settingsHeader:"Settings_settingsHeader__xgBH0",settingsContent:"Settings_settingsContent__H8yeX",settingsItem:"Settings_settingsItem___KHYN",logoutButton:"Settings_logoutButton__q2EBl"}},1360:function(e){e.exports={sidebar:"Sidebar_sidebar__7586C",searchBar:"Sidebar_searchBar__vcNO_",searchInput:"Sidebar_searchInput__G_xWN",searchIcon:"Sidebar_searchIcon__8Tj82",searchResults:"Sidebar_searchResults__XnpNZ",searchResultItem:"Sidebar_searchResultItem__HF25H",chatList:"Sidebar_chatList__1x72M",chatItem:"Sidebar_chatItem__iY1JT",profileImage:"Sidebar_profileImage__Q0_u4",profileImagePlaceholder:"Sidebar_profileImagePlaceholder__URLHX",chatInfo:"Sidebar_chatInfo__J8XaZ",username:"Sidebar_username__lXabE",unreadBadge:"Sidebar_unreadBadge__9_yL3",lastMessage:"Sidebar_lastMessage__dleo4",dark:"Sidebar_dark__rz8wa",light:"Sidebar_light__C_JBs",searchSection:"Sidebar_searchSection__QsRpU",searchSectionTitle:"Sidebar_searchSectionTitle__bvPCD",noResults:"Sidebar_noResults__vH_B7",onlineIndicator:"Sidebar_onlineIndicator__O0yid",sidebarHeader:"Sidebar_sidebarHeader__itazf",logoutButton:"Sidebar_logoutButton__meJbC",headerTop:"Sidebar_headerTop__V_ANz",menuButton:"Sidebar_menuButton__dwnfn"}},8145:function(e){e.exports={container:"TelegramApp_container__snmWK",chatContainer:"TelegramApp_chatContainer___1z2P",sidebar:"TelegramApp_sidebar__rEXFb",chatArea:"TelegramApp_chatArea__StrY1",noChatSelected:"TelegramApp_noChatSelected__0nCZ6",sidebarMobile:"TelegramApp_sidebarMobile__eUiy6",sidebarHidden:"TelegramApp_sidebarHidden__xiVSt",chatAreaMobile:"TelegramApp_chatAreaMobile__ozr1P",chatAreaHidden:"TelegramApp_chatAreaHidden__G08Ly"}},917:function(e){e.exports={fileUpload:"FileUpload_fileUpload__JZalo",uploadButton:"FileUpload_uploadButton__ZIbIB"}},6923:function(e){e.exports={videoCall:"VideoCall_videoCall__5Wo4c",videos:"VideoCall_videos__tHF35",localVideo:"VideoCall_localVideo__oU_33",remoteVideo:"VideoCall_remoteVideo__MG0gD",controls:"VideoCall_controls__TecxW",controlButton:"VideoCall_controlButton__o7nfs",endCall:"VideoCall_endCall__mD_tZ"}},4966:function(e){e.exports={voiceRecorder:"VoiceRecorder_voiceRecorder__RDQwD",recordButton:"VoiceRecorder_recordButton__yeFLs",recording:"VoiceRecorder_recording__GA1FM",pulse:"VoiceRecorder_pulse__25EZY",duration:"VoiceRecorder_duration__jXS02"}}},function(e){e.O(0,[25,706,956,64,559,971,117,744],function(){return e(e.s=7033)}),_N_E=e.O()}]);