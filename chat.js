function startchat (id)
{
    document.getElementById('chatpanel').removeAttribute('style');
    document.getElementById('divstart').setAttribute('style','display:none');

}

    /*function onkeydown()
 {
     document.addEventListener('keypress', function (key){
      if(key.which ===13)
      {
        sendmessage();
      }
     });
 }*/

 $('#txtmessage').keypress(function(key){
    if(key.which ===13)
    {
    
    sendmessage();
    }
    else
    {
        
    }
 })
     ///emoji //
     loadallemoji();
     function loadallemoji()
     {
         var emoji = '';
         for (var i= 128512;i<=128564;i++)
         {
             emoji += `<a  href="#"style="font-size:25px;text-decoration:none;"
             onclick="getemoji(this)">&#${i}</a>`;
         }
         
         document.getElementById('simlly').innerHTML=emoji;
     }
     function showemoji()
     {
         
         document.getElementById('emoji').removeAttribute('style');
     }
  //hide emoji pannel

   function hideemojipannel()
   {
    document.getElementById('emoji').setAttribute('style','display:none');
   }

   function getemoji(control) 
   {
    document.getElementById('txtmessage').value += control.innerHTML;
     }
 

 function sendmessage()
 {
     
     var message = `
           
             <div class="row justify-content-end">

                <div class="col-4 col-sm-5 col-md-5">
                    <p class="sent float-right">
                       ${document.getElementById('txtmessage').value}
                        <span class="time float-right">1:28 pm</span>
                    </p>
                </div>

                
                <div class="col-2 col-sm-1 col-md-1">
                    <img src="noimage.png" class="profilepic">
                </div>
             </div> 
              
     
             `;


   document.getElementById('messages').innerHTML +=message;
   document.getElementById('txtmessage').value='';
   document.getElementById('txtmessage').focus();
 }

 //////////////////////////////////

    function PopulateFriendlist()
    {
        document.getElementById('istFriend').innerHTML= `<div class="text-center">
        <span class="spinner-border text-primary text-primary mt-5" style="
        width:7rem; height:7rem;">

        </span>
        </div>`;

        var db = firebase.database().ref('users');
        var Ist = ``;
       db.on('value',function (users){
            if(users.hasChildren()){
                var Ist =`<li class="list-group-item" style="background-color: #f8f8f8;">
                <input type="text" placeholder="search or new chat" class="form-control from-rouned">
            </li>`;
            }
           users.forEach(function (data){
               if(users.hasChildren())
               var user = data.val();
               Ist+=  `<li class="list-group-item list-group-item-action"id="chatpanel" onclick="startchat(1)">
               <div class="row">
                   <div class="col-md-2">
                       <img src="${user.photoURL}" alt="img" class="frined-pic rounded">
                   </div>
                   <div class="col-md-10" style="cursor: pointer;">
                       <div class="name">${user.name}</div>
                       <div class="under-name">this is some message text</div>
                   </div>

               </div>
           </li> `;
            
           });
           document.getElementById('istFriend').innerHTML=Ist;

       });


        
    }

    function  changeicon(control) {
        if(control.value !=='')
        {
        document.getElementById('send').removeAttribute('style');
        document.getElementById('audio').setAttribute('style','display:none');
        document.getElementById('audio').setAttribute('style','display:none');
        }
        else
        {
            document.getElementById('audio').removeAttribute('style');
            document.getElementById('send').setAttribute('style','display:none');
        }
        
    }
  


 function signin(){
     var provider = new firebase.auth.GoogleAuthProvider();
     firebase.auth().signInWithPopup(provider);
 }

 function singOut()
 {
     firebase.auth().singOut();
 }

 function onFirebaseStateChanged()
 {
     firebase.auth().onAuthState.Changed(onStateChanged);
 }

 function onStateChanged(user)
 {
   if(user)
   {
       //alert(firebases.auth().Currentuser.email + '\n'+ firebase.auth.currentUser.displayName);
       var userProfile = {email:'',name:'',photoURL:''};
       userProfile.email=firebase.auth().currentUser.email;
       userProfile.name=firebase.auth().currentUser.displayName;
       userProfile.photoURL=firebase.auth().currentUser.photoURL;

       var db = firebase.database().ref('users');
       var flag =false;
       db.on('value',function (users){
           users.forEach(function (data){
               var user = data.val();
               if(user.email===userProfile.email)
               flag = true;
           })

           if(flag ===false)
           {
            firebase.database().ref('users').push(userProfile.callback);
           }
           else
           {
            document.getElementById('imgprofile').src=firebase.auth().currentUser.photoURL;
            document.getElementById('imgprofile').title=firebase.auth().currentUser.displayName;
     
            document.getElementById('linksingin').style='display:none';
         document.getElementById('linksingout').style=''; 
           }
       });
   }
   else
   {
    document.getElementById('imgprofile').src='/what app chat/avtar.png';
    document.getElementById('imgprofile').title='';
    document.getElementById('linksingin').style='';
    document.getElementById('linksingout').style='display:none';

    document.getElementById('linkNewchat').classList.add('disabled');
   }
 }

  function callback(error)
  {
 if(error)
 {
     alert(error);
 }
 else
 {
    
       document.getElementById('imgprofile').src=firebase.auth().currentUser.photoURL;
       document.getElementById('imgprofile').title=firebase.auth().currentUser.displayName;

       document.getElementById('linksingin').style='display:none';
    document.getElementById('linksingout').style='';
     
    
 }
  }
 //call auth State changed
  onFirebaseStateChanged();
