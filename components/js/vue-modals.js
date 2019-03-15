Vue.component('friend-list-modal', {
    data: function() {

        return {
            app: app,
            friends: app.friend_list,
            setCurrentProfile: app.setCurrentProfile,
            addFriend: app.addFriend,
            add_temp: app.add_friend,
            add_friends: false
        }
    },
    template: `  <transition name="friend-list-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container p-8">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
                <span class="block" v-if="!add_friends">
                    <span v-for="friend in friends"> 
                        <div class="inline-block mx-5 mt-12 mb-12 px-5">
                            <div class="text-center">
                              <img @click="app.friendInfo_showModal = true; setCurrentProfile(friend)" class="friends-image-thumb rounded-full shadow-lg bg-black" v-bind:src="friend.pr_pic">
                              <h3 class="block text-black mt-3 text-3xl"> {{ friend.full_name }} </h3>
                            </div>
                        </div>
                    </span>         
                </span>
                <span v-else>
                    <h4 class="mb-8" slot="header">Add Friend</h4>
                    <div> Name: <input v-model="add_temp.full_name" class="custom_input py-5 px-5" type="text"> </div>
                    <div> Location: <input v-model="add_temp.location" class="custom_input py-5 px-5" type="text"> </div>
                    <button v-on:click="addFriend(add_temp.full_name, add_temp.location); return add_friends = false" class="mt-10 py-8 px-12 text-white bg-teal"> Add + </button>                
                </span>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">

              <button class="modal-default-button py-8 px-12 text-white bg-teal" @click="$emit('close')">
                Close
              </button>
              <button v-if="!add_friends" v-on:click="add_friends = true" class="py-8 px-12 text-white bg-teal"> Add Friends </button>   
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>`
  })

Vue.component('friend-info-modal', {
    data: function() {

      return {
          current_profile: app.current_profile
      }
    },
    template: `  <transition name="friend-info-modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container p-8">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body source-sans"> 
            <slot name="body">
            <div class="text-center">
               <img class="friends-image-full rounded-full border-active shadow-lg" v-bind:src="current_profile.pr_pic"> 
               <h2> {{ current_profile.full_name }} </h2>
               <h5 class="text-grey-dark"> {{ current_profile.location }} </h5>
               <h5 v-if="current_profile.active" class="text-grey-dark"> Online </h5>
            </div>

            <div>
              <h3 class="my-6"> About {{ current_profile.full_name }} : </h3>
              <div class="my-6">
              {{ current_profile.about }}
              </div>
            </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">

              <button class="modal-default-button py-8 px-12 text-white bg-teal" @click="$emit('close')">
                Close
              </button>
        
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>`
  })