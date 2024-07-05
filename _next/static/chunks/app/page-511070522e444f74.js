(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{2115:function(e,t,s){Promise.resolve().then(s.bind(s,3161))},3161:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return U}});var n=s(7437),a=s(3248),r=s(2265),i=s(9448),o=s(1583);class l{on(e,t){let s="on".concat(e.charAt(0).toUpperCase()).concat(e.substring(1));s in this.eventHandlers&&(this.eventHandlers[s]=t)}off(e,t){let s="on".concat(e.charAt(0).toUpperCase()).concat(e.substring(1));delete this.eventHandlers[s]}sendMessage(e){let{message:t,conversationId:s}=e,[n]=this.storage.getConversation(s);n&&(n.data.lastMsgTimestamp=new Date),this.storage.sendMessage(s,t.content).then(e=>{let{data:n,error:a}=e;if(a){console.error(a,t,s),t.status=-1,this.updateState();return}t.id=n,this.updateState()})}sendTyping(e){let{isTyping:t,content:s,conversationId:n,userId:a}=e;console.log("-> SupaBase service typing ")}constructor(e,t,s){this.eventHandlers={},this.supabase=s,this.storage=e,this.updateState=t}}s(9735);let c=(0,r.createContext)({});var d=s(8481);class u{async getChatMesssages(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10,{data:n,error:a}=await this.supabase.rpc("get_chat_messages",{arg_chat_id:e,since:t||new Date().toISOString(),count:s});return console.info("get_chat_messages",n,a),a&&console.error("get_chat_messages",a),{data:n,error:a}}async getRecentChatsFull(e,t){let{data:s,error:n}=await this.supabase.rpc("get_recent_chats_full",{start:e,count:t});return console.info("get_recent_chats_full",s,n),n&&console.error("get_recent_chats_full",n),{data:s,error:n}}async getProfiles(e){let{data:t,error:s}=await this.supabase.rpc("get_profiles",{profiles_array:e});return console.info("get_profiles",t,s),s&&console.error("get_profiles",s),{data:t,error:s}}registerOnChatMessage(e){return this.supabase.channel("schema-db-changes").on("postgres_changes",{event:"INSERT",schema:"public",table:"messages"},t=>{console.info("Subs:",t),e(t)}).subscribe()}unregisterSubscription(e){e.unsubscribe()}async getPrivateChat(e){let{data:t,error:s}=await this.supabase.rpc("get_or_create_private_chat_with",{profile:e});return console.info("get_or_create_private_chat_with",t,s),s&&console.error("get_or_create_private_chat_with",s),{data:t,error:s}}async sendMessage(e,t,s){let{data:n,error:a}=await this.supabase.rpc("send_message_to_chat",{chat_id:e,content:t,reply_to:s});return console.info("send_message_to_chat",n,a),a&&console.error("send_message_to_chat",a),{data:n,error:a}}constructor(e){this.supabase=e}}var h=s(1386);class g{get groupIdGenerator(){return this._groupIdGenerator}get messageIdGenerator(){return this._messageIdGenerator}getMessageWithId(e,t){if(!t)return e;if(this.messageIdGenerator)return{...e,id:this.messageIdGenerator(e)};throw"Id generator is not defined"}userExists(e){return -1!==this.users.findIndex(t=>t.id===e)}setCurrentUser(e){this.currentUser=e}addUser(e){let[t]=this.getUser(e.id);if(t)for(let s of["firstName","lastName","username","email","avatar","bio"])""===t[s]&&""!==e[s]&&(t[s]=e[s]);else this.users=this.users.concat(e);return!t}removeUser(e){let t=this.users.findIndex(t=>t.id===e);return -1!==t&&(this.users=this.users.slice(0,t).concat(this.users.slice(t+1)),!0)}getUser(e){let t=this.users.findIndex(t=>t.id===e);return -1!==t?[this.users[t],t]:[void 0,void 0]}conversationExists(e){return -1!==this.conversations.findIndex(t=>t.id===e)}getConversation(e){let t=this.conversations.findIndex(t=>t.id===e);return -1!==t?[this.conversations[t],t]:[void 0,void 0]}addConversation(e){let t=!this.conversationExists(e.id);return t&&(this.conversations=this.conversations.concat(e)),t}setUnread(e,t){let[s]=this.getConversation(e);s&&(s.unreadCounter=t)}removeConversation(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1],s=this.conversations.findIndex(t=>t.id===e);return -1!==s&&(this.conversations=this.conversations.slice(0,s).concat(this.conversations.slice(s+1)),t&&delete this.messages[e],!0)}updateConversation(e){let[t,s]=this.getConversation(e.id);t&&this.replaceConversation(e,s)}replaceConversation(e,t){this.conversations=this.conversations.slice(0,t).concat(new o.Conversation({id:e.id,participants:e.participants,typingUsers:e.typingUsers,unreadCounter:e.unreadCounter,draft:e.draft,description:e.description,readonly:e.readonly,data:e.data})).concat(this.conversations.slice(t+1))}replaceUser(e,t){this.users=this.users.slice(0,t).concat(e).concat(this.users.slice(t+1))}addParticipant(e,t){let[s,n]=this.getConversation(e);return s&&s.addParticipant(t)&&this.replaceConversation(s,n),!1}removeParticipant(e,t){let[s,n]=this.getConversation(e);return!!s&&(s.removeParticipant(t),this.replaceConversation(s,n),!0)}addMessage(e,t){let s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t in this.messages){let n=this.messages[t],a=n[n.length-1];if(a.senderId===e.senderId){let t=this.getMessageWithId(e,s);return a.addMessage(t),t}}let n=new h.MessageGroup({id:this.groupIdGenerator(),senderId:e.senderId,direction:e.direction}),a=this.getMessageWithId(e,s);return n.addMessage(a),this.messages[t]=t in this.messages?this.messages[t].concat(n):[n],a}addMessageToBeginning(e,t){let s=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t in this.messages){let n=this.messages[t],a=n[0];if(a.senderId===e.senderId){let t=this.getMessageWithId(e,s);return a.messages.unshift(t),t}}let n=new h.MessageGroup({id:this.groupIdGenerator(),senderId:e.senderId,direction:e.direction}),a=this.getMessageWithId(e,s);return n.addMessage(a),t in this.messages?this.messages[t].unshift(n):this.messages[t]=[n],a}updateMessage(e){for(let t in this.messages){let s=this.messages[t],n=s.length;for(let t=0;t<n;t++){let n=s[t],[a,r]=n.getMessage(e.id);a&&n.replaceMessage(e,r)}}}updateMessageWithID(e,t){for(let s in this.messages){let n=this.messages[s],a=n.length;for(let s=0;s<a;s++){let a=n[s],[r,i]=a.getMessage(e);r&&a.replaceMessage(t,i)}}}setPresence(e,t){let[s,n]=this.getUser(e);s&&(s.presence=t,this.replaceUser(s,n))}setDraft(e){if(this.activeConversationId){let[t,s]=this.getConversation(this.activeConversationId);t&&(t.draft=e,this.replaceConversation(t,s))}}clearState(){}getState(){return{currentUser:this.currentUser,users:this.users,conversations:this.conversations,activeConversation:this.activeConversationId?this.conversations.find(e=>e.id===this.activeConversationId):void 0,currentMessages:this.activeConversationId&&this.activeConversationId in this.messages?this.messages[this.activeConversationId]:[],messages:this.messages,currentMessage:this.currentMessage}}resetState(){this.currentUser=void 0,this.users=[],this.conversations=[],this.activeConversationId=void 0,this.messages={}}setActiveConversation(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];if(this.activeConversationId=e,t&&e){let[t,s]=this.getConversation(e);t&&(t.unreadCounter=0,this.replaceConversation(t,s))}}setCurrentMessage(e){this.currentMessage=e}removeMessagesFromConversation(e){delete this.messages[e]}constructor({groupIdGenerator:e,messageIdGenerator:t}){this.users=[],this.conversations=[],this.messages={},this.currentMessage="",this._groupIdGenerator=e,this._messageIdGenerator=t}}class p extends g{async signOut(){return this.supabase.auth.signOut()}async loadPastMessages(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:10;if(this.getConversation(e)[0].data.noMorePastMessages)return{data:null,error:p.NO_MORE_PAST_MESSAGES};if(!t){var n,a;t=null===(a=this.messages[e])||void 0===a?void 0:null===(n=a.at(0))||void 0===n?void 0:n.messages.at(0)}let{data:r,error:i}=await this.supabaseDB.getChatMesssages(e,t?t.createdTime.toISOString():null,s);if(i)return{data:null,error:i};for(let t of(r.length||(this.getConversation(e)[0].data.noMorePastMessages=!0),r))this.addMessageToBeginning(new o.ChatMessage({id:t.id,senderId:t.profile_id,content:t.content,contentType:o.MessageContentType.TextPlain,createdTime:new Date(t.created_at),status:o.MessageStatus.Seen,direction:t.profile_id==this.session.user.id?o.MessageDirection.Outgoing:o.MessageDirection.Incoming}),e,!1);return console.log("Updated the messages of",e),{data:null,error:null}}async getRecentChats(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.recentChatStart,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;if(this.allRecentChatsLoaded)return{data:[],error:p.NO_MORE_RECENT_CHATS};let{data:s,error:n}=await this.supabaseDB.getRecentChatsFull(e,t);if(n)return{data:null,error:n};this.recentChatStart=e+s.length,(s.length<length||0==s.length)&&(this.allRecentChatsLoaded=!0);let a=new Set;for(let e of s){a.add(e.other_member);let t=new o.Conversation({id:e.id,participants:[new o.Participant({id:e.other_member,role:new o.ConversationRole([])})],unreadCounter:0,typingUsers:new o.TypingUsersList({items:[]}),draft:"",data:{noMorePastMessages:!1,lastMsgTimestamp:new Date(e.last_msg_timestamp)}});this.addConversation(t)}return this.conversations.sort(v),this.conversations=this.conversations.concat(),{data:a,error:n}}async getUsers(e){let t,s=!(arguments.length>1)||void 0===arguments[1]||arguments[1];if(s?(t=[],e.forEach(e=>{this.users.find(t=>t.id===e)||t.push(e)})):t=e,!t.length)return{data:null,error:null};{let{data:e,error:s}=await this.supabaseDB.getProfiles(t);return s?{data:null,error:s}:(e.forEach(e=>{this.addUser(new o.User(e))}),{data:e,error:s})}}async registerOnChatMessage(e){this.subscription=await this.supabaseDB.registerOnChatMessage(t=>{let s=t.new;s.profile_id!=this.session.user.id&&(this.addMessage(new o.ChatMessage({id:s.id,senderId:s.profile_id,content:s.content,contentType:o.MessageContentType.TextPlain,createdTime:s.created_at,status:o.MessageStatus.Seen,direction:s.profile_id==this.session.user.id?o.MessageDirection.Outgoing:o.MessageDirection.Incoming}),s.chat_id,!1),e())})}async unregisterOnChatMessage(){if(this.subscription)return this.supabaseDB.unregisterSubscription(this.subscription)}async getPrivateChat(e){let{data:t,error:s}=await this.supabaseDB.getPrivateChat(e);if(s)return{data:t,error:s};let n=new o.Conversation({id:t,participants:[new o.Participant({id:e,role:new o.ConversationRole([])})],unreadCounter:0,typingUsers:new o.TypingUsersList({items:[]}),draft:"",data:{noMorePastMessages:!1,lastMsgTimestamp:new Date}});return this.addConversation(n),{data:t,error:s}}sendMessage(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return this.supabaseDB.sendMessage(e,t,s)}addMessage(e,t,s){let n=super.addMessage(e,t,s),[a]=this.getConversation(t);if(a)a.data.lastMsgTimestamp=new Date(e.createdTime);else{let s=new o.Conversation({id:t,participants:[new o.Participant({id:e.senderId,role:new o.ConversationRole([])})],unreadCounter:1,data:{noMorePastMessages:!1,lastMsgTimestamp:new Date(e.createdTime)}});this.addConversation(s)}return this.conversations.sort(v),this.conversations=this.conversations.concat(),n}constructor(e,t,s){super(s),this.recentChatStart=0,this.allRecentChatsLoaded=!1,console.info("New ChatStorage is constructed"),this.supabaseDB=new u(e),this.supabase=e,this.session=t}}function v(e,t){return t.data.lastMsgTimestamp-e.data.lastMsgTimestamp}function f(e){let{supabase:t}=(0,r.useContext)(c),s=(0,r.useRef)(void 0),a=(0,r.useRef)("");function o(){e.onSearchResult&&e.onSearchResult(null)}(0,r.useEffect)(()=>()=>{s.current&&(clearTimeout(s.current),s.current=void 0)},[]);let l=(0,r.useCallback)(()=>{if(s.current=void 0,""==a.current){console.info("ProfileSearch hit the timeout but value is empty, ignoring.");return}t.from("profiles").select().ilike("username","".concat(a.current,"%")).then(t=>{let{data:s,error:n}=t;console.info("Search results: ",s),n&&console.error(n),e.onSearchResult&&e.onSearchResult(s)})},[]);return(0,n.jsx)(i.ol,{onChange:t=>{s.current&&clearTimeout(s.current),a.current=t,""==t?o():s.current=setTimeout(l,e.waitPeriod?e.waitPeriod:1e3)},onClearClick:o,placeholder:e.placeholder})}p.NO_MORE_RECENT_CHATS="No more recent chats",p.NO_MORE_PAST_MESSAGES="No more past messages",s(114);let m={position:"fixed",display:"block",width:"500px",height:"500px",left:"50%",top:"50%",transform:"translateX(-50%) translateY(-50%)",color:"white",textAlign:"center",padding:"auto",zIndex:10,backgroundColor:"blue"};function C(e){let[t,s]=(0,r.useState)(e.user.bio),a=(0,r.useCallback)(e=>{s(e.target.value)},[s]),[o,l]=(0,r.useState)(e.user.avatar),c=(0,r.useCallback)(e=>{l(e.target.value)},[l]),d=(0,r.useCallback)(()=>{},[]),u=(0,r.useRef)(null);return(0,r.useEffect)(()=>{let e;let t={x:0,y:0},s=s=>{e={x:s.clientX,y:s.clientY};let n=u.current.style.translate.match(/(-?\d+(?:\.\d+)?)px (-?\d+(?:\.\d+)?)px/);n&&(t={x:Number(n[1]),y:Number(n[2])})},n=s=>{let n={x:s.clientX-e.x,y:s.clientY-e.y};u.current.style.translate="".concat(t.x+n.x,"px ").concat(t.y+n.y,"px"),console.log("Delta:",n,"Client:",{x:s.clientX,y:s.clientY})},a=e=>{console.log("Drag end:")};u.current&&(console.log("attaching..."),u.current.addEventListener("dragstart",s),u.current.addEventListener("drag",n),u.current.addEventListener("dragend",a));let r=function(e){e.preventDefault()};return document.addEventListener("dragover",r,!1),()=>{u.current&&(console.log("detaching..."),u.current.removeEventListener("dragstart",s),u.current.removeEventListener("drag",n),u.current.removeEventListener("dragend",a),document.removeEventListener("dragover",r,!1))}},[]),(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{draggable:"true",ref:u,style:m,children:(0,n.jsxs)(i.tz,{className:"profileEditor",style:{flexDirection:"column",padding:"10px",justifyContent:"space-between"},children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{style:{width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:(0,n.jsx)("img",{src:e.user.avatar,style:{objectFit:"cover",width:"100px",height:"100px"}})}),(0,n.jsx)("label",{children:"Set your profile picture:"}),(0,n.jsx)("input",{placeholder:"Profile picture url",value:o,onChange:c})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"Set your status:"}),(0,n.jsx)("textarea",{placeholder:"Status",value:t,onChange:a,rows:3})]}),(0,n.jsxs)("div",{className:"buttonBox",children:[(0,n.jsx)(i.zx,{border:!0,onClick:e.onClose,children:"Close"}),(0,n.jsx)(i.zx,{border:!0,onClick:d,children:"Save Settings"})]})]})})})}let x=e=>(0,d.x0)(),M=()=>(0,d.x0)();function b(){let{supabase:e,session:t}=(0,r.useContext)(c),s=(0,r.useRef)(new p(e,t,{groupIdGenerator:M,messageIdGenerator:x})),a=(0,r.useCallback)((t,s)=>new l(t,s,e),[e]),i=t.user,d={id:i.id,presence:new o.Presence({status:o.UserStatus.Unknown,description:"<presence unknown>"}),firstName:"You",lastName:"",username:i.user_metadata.username,email:i.email||"<no email>",avatar:"",bio:""};return(0,n.jsx)(o.ChatProvider,{serviceFactory:a,storage:s.current,config:{typingThrottleTime:250,typingDebounceTime:900,debounceTyping:!0,autoDraft:o.AutoDraft.Save|o.AutoDraft.Restore},children:(0,n.jsx)(_,{user:d})})}function _(e){let{user:t}=e,{service:s,currentMessages:a,conversations:l,activeConversation:c,setActiveConversation:d,sendMessage:u,getUser:h,updateState:g,messages:v}=(0,o.useChat)(),[m,x]=(0,r.useState)(!1),[M,b]=(0,r.useState)(!1),[_,I]=(0,r.useState)(!1),[S,y]=(0,r.useState)(!1),[j,w]=(0,r.useState)(null),U=s.storage;U.addUser(t);let[E]=U.getUser(t.id);(0,r.useEffect)(()=>{U.getUsers([E.id],!1).then(e=>{let{data:t,error:s}=e;console.log("Updated current user's information",t,s,E),g()})},[E.id,U]);let T=(0,r.useCallback)(()=>{I(!0),U.getRecentChats().then(e=>{let{data:t,error:s}=e;if(I(!1),null!=s&&s!=p.NO_MORE_RECENT_CHATS){console.error("Unable to get recent chats.");return}g(),U.getUsers(Array.from(t)).then(e=>{let{error:t}=e;if(t){console.error("Unable to get users.");return}g()})})},[I,U,g]);(0,r.useEffect)(()=>(T(),U.registerOnChatMessage(g),()=>{U.unregisterOnChatMessage()}),[g,U,T]);let R=(0,r.useRef)(!1),P=(0,r.useCallback)(()=>{if(!R.current&&(R.current=!0,c)){if(c.data.noMorePastMessages){R.current=!1;return}console.log("Loading messages for",c.id),x(!0),U.loadPastMessages(c.id).then(()=>{x(!1),g(),R.current=!1})}},[c,x,g,U]);return(0,n.jsxs)(i.tz,{responsive:!0,children:[(0,n.jsxs)(i.YE,{position:"left",scrollable:!0,children:[(0,n.jsxs)(i.BU,{style:{backgroundColor:"#fff"},children:[(0,n.jsx)(i.HE,{size:"lg",children:(0,n.jsx)(i.qE,{src:E.avatar,size:"lg"})}),(0,n.jsx)(i.BU.Content,{userName:E.username,info:"User Info",style:{paddingLeft:"20px",paddingBottom:"30px"}}),(0,n.jsxs)(i.BU.Actions,{children:[(0,n.jsx)(i.d_,{onClick:()=>{y(e=>!e)}}),(0,n.jsx)(i.b4,{onClick:async()=>{let{error:e}=await U.signOut();e&&console.error(e)}})]})]}),(0,n.jsx)(f,{placeholder:"Search...",onSearchResult:e=>{if(e)for(let t of e)U.addUser(new o.User({id:t.id,username:t.username,avatar:t.avatar}));w(e)}}),(0,n.jsxs)(i.p7,{loading:_,onYReachEnd:()=>{_||console.log("ConvList reached Y end")},children:[null!==j?j.map(e=>(0,n.jsx)(i.ri,{name:e.username,active:(null==c?void 0:c.id)==e.id,onClick:()=>{b(!0),U.getPrivateChat(e.id).then(e=>{let{data:t,error:s}=e;b(!1),s||(d(t),U.loadPastMessages(t).then(g))})},children:(0,n.jsx)(i.qE,{src:e.avatar,size:"lg"})},e.id)):l.map(e=>{let[t,s]=(()=>{let t=e.participants.length>0?e.participants[0]:void 0;if(t){let e=h(t.id);if(e)return[(0,n.jsx)(i.qE,{src:e.avatar,size:"lg"}),e.username]}return[void 0,void 0]})();return(0,n.jsx)(i.ri,{name:s||"Conv "+e.id,info:e.draft?"Draft: ".concat(e.draft.replace(/<br>/g,"\n").replace(/&nbsp;/g," ")):"",active:(null==c?void 0:c.id)===e.id,unreadCnt:e.unreadCounter,onClick:()=>{d(e.id),e.id in v||U.loadPastMessages(e.id).then(()=>{g()})},children:t},e.id)}),(0,n.jsx)(i.ri,{children:(0,n.jsx)(i.ri.Content,{children:(0,n.jsx)(i.zx,{onClick:T,disabled:U.allRecentChatsLoaded,children:U.allRecentChatsLoaded?"No More Conversation":"Load Past Conversations"})})})]})]}),(0,n.jsxs)(i.uU,{children:[(0,n.jsxs)(i.BU,{children:[(0,n.jsx)(i.BU.Back,{}),(0,n.jsx)(i.qE,{src:"https://i.pinimg.com/originals/25/78/61/25786134576ce0344893b33a051160b1.jpg",name:"Zoe"}),(0,n.jsx)(i.BU.Content,{userName:"Zoe",info:"Active 10 mins ago"}),(0,n.jsx)(i.BU.Actions,{children:(0,n.jsx)(i.RZ,{onClick:()=>{console.log("info")},style:{display:"block"}})})]}),(0,n.jsxs)(i.rN,{loading:M,loadingMore:m,onYReachStart:()=>{console.log("Y reached"),P()},children:[c&&(0,n.jsx)(i.it,{children:c.data.noMorePastMessages?"Reached the start of the conversation":(0,n.jsx)(i.zx,{border:!0,onClick:P,children:"Click to load past messages"})}),c&&a.map(e=>(0,n.jsx)(i.dm,{direction:e.direction,children:(0,n.jsx)(i.dm.Messages,{children:e.messages.map(e=>(0,n.jsx)(i.v0,{model:{type:"html",payload:e.content,direction:e.direction,position:"normal"},children:-1==e.status&&(0,n.jsx)(i.v0.Footer,{children:"Unable to send message"})},e.id))})},e.id))]}),(0,n.jsx)(i.Ru,{onSend:(e,t)=>{console.log("attempted to send:",t);let s=new o.ChatMessage({id:"",content:t,contentType:o.MessageContentType.TextHtml,senderId:E.id,direction:o.MessageDirection.Outgoing,status:o.MessageStatus.Sent});c&&u({message:s,conversationId:c.id,senderId:E.id,generateId:!1})},placeholder:"Type message here"})]}),S?(0,n.jsx)(C,{user:E,onClose:()=>{y(e=>!e)}}):(0,n.jsx)(n.Fragment,{})]})}var I=s(5750),S=s(6082);function y(e){let t=(0,r.useRef)("");return t.toJSON=()=>t.current,(0,n.jsx)(I.gx,{supabaseClient:e.supabase,providers:[],additionalData:{username:t},appearance:{theme:S.rD},theme:"default",children:(0,n.jsx)(j,{usernameValueRef:t})})}function j(e){(0,r.useEffect)(()=>{e.usernameValueRef.current=""},[]);let t=(0,r.useCallback)(t=>{e.usernameValueRef.current=t.target.value},[]);return(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"supabaseLabelStyle",children:"Choose a Username:"}),(0,n.jsx)("input",{className:"supabaseInputStyle",placeholder:"Username",type:"text",onChange:t})]})}s(7070);let w=(0,a.eI)("https://mcuabbzvkwkcwxycolft.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jdWFiYnp2a3drY3d4eWNvbGZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ5NTI4MTksImV4cCI6MjAxMDUyODgxOX0.7sfrAlnJ3nCNuo96PS_QTotc9PRGthKAl0LSIo2Q8k0");function U(){let[e,t]=(0,r.useState)(void 0);return((0,r.useEffect)(()=>{void 0===e&&w.auth.onAuthStateChange((e,s)=>{console.info(e),console.error("supabase.auth.onAuthStateChange"),t(s)})},[]),void 0===e)?(0,n.jsx)(i.aN,{variant:"default",children:"Loading"}):null===e?(0,n.jsx)(y,{supabase:w}):(0,n.jsx)("div",{style:{position:"fixed",width:"98%",height:"98%"},children:(0,n.jsx)(r.StrictMode,{children:(0,n.jsx)(c.Provider,{value:{supabase:w,session:e},children:(0,n.jsx)(b,{})})})})}},7070:function(){},114:function(){}},function(e){e.O(0,[439,728,971,596,744],function(){return e(e.s=2115)}),_N_E=e.O()}]);