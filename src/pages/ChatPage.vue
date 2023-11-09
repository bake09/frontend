<template>
  <q-page class="flex flex-center">
    <div class="scroll-area-bg" style="min-width: 500px; border: 1px solid grey; border-radius: 3px;">
      <q-scroll-area
        class="scroll-area-bg"
        ref="scrollAreaRef"
        style="height: calc(100vh - 110px); width: 100%;"
        :thumb-style="globalStore.thumbStyle"
        :bar-style="globalStore.barStyle"
      >
        <div
          class="chat-item-wrapper"
          v-for="msg in chatStore.messages"
          :key="msg.id"
        >
          <q-chat-message
            class="q-ma-sm"
            :name="msg.sender.name"
            :sent="msg.sender == 1 ? true : false"
            stamp="7 minutes ago"
            :bg-color="msg.sender ? 'green-2' : 'grey-1'"
            text-color="black"
          >
            <div>
              <div class="text-caption text-bold text-amber-9">{{ msg.name }}</div>
              <q-img
                v-if="msg.image"
                :src="msg.image"
                width="160px"
                height="auto"
              />
              <div class="q-pt-xs">
                {{ msg.content }}
              </div>
            </div>
          </q-chat-message>
        </div>
      <q-inner-loading :showing="chatStore.isLoading" dark>
        <q-spinner color="white" size="3em" />
      </q-inner-loading>
      </q-scroll-area>
      <div class="q-pa-sm bg-transparent">
        <q-input  v-model="chatStore.createForm.content" placeholder="Message" dense outlined rounded ref="newMessageInputRef" @keydown.enter="sendMessage" class="col q-mr-xs" bg-color=" bg-white" style="border-radius: 28px;">
          <template v-slot:prepend>
            <q-btn icon="mood" dense round flat />
          </template>
          <template v-slot:append>
            <q-icon v-if="chatStore.createForm.content !== ''" name="close" @click="clearInput" class="cursor-pointer" />
            <q-btn icon="attach_file" dense round flat @click="chatStore.createForm.content = ''" />
          </template>
          <template v-slot:after>
            <q-btn round flat icon="send" class="bg-primary text-white" @click="sendMessage" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { useGlobalStore } from "stores/global-store";
const globalStore = useGlobalStore()

import { useChatStore } from "stores/chat-store";
const chatStore = useChatStore()

const messages = ref([
  {
    id: 1,
    content: 'Text 1',
    sender: true,
    name: '',
    image: ''
  },
  {
    id: 2,
    content: 'Text 2',
    sender:  true,
    name: '',
    image: 'https://picsum.photos/500/300'
  },
  {
    id: 3,
    content: 'Text 3',
    sender: false,
    name: 'John Doe',
    image: ''
  },
  {
    id: 4,
    content: 'Text 4',
    sender: true,
    name: '',
    image: ''
  },
  {
    id: 5,
    content: 'Text 5',
    sender: false,
    name: 'John Doe',
    image: 'https://picsum.photos/500/300'
  },
  {
    id: 6,
    content: 'Text 6',
    sender: false,
    name: 'John Doe',
    image: ''
  },
  {
    id: 7,
    content: 'Text 7',
    sender: false,
    name: 'John Doe',
    image: 'https://picsum.photos/500/300'
  },
  {
    id: 8,
    content: 'Text 8',
    sender: true,
    name: '',
    image: ''
  },
  {
    id: 9,
    content: 'Text 9',
    sender: true,
    name: '',
    image: 'https://picsum.photos/500/300'
  },
])

const message = ref('');
const newMessageInputRef = ref(null)

const sendMessage = async () => {
  if(chatStore.createForm.content.length){
    await chatStore.createMessage()
    scrollAnimated()
  }
}

const clearInput = () => {
  chatStore.createForm.content = ''
  newMessageInputRef.value.focus()
}

onMounted(async () => {
  await chatStore.getMessages()
  scroll()
})

const scrollAreaRef = ref(null)

const scrollAnimated = () => {
  setTimeout(() => {
    scrollAreaRef.value.setScrollPercentage('vertical', 1, 0)
    // scrollAreaRef.value.setScrollPercentage('vertical', 1, 80)
  }, 100);
}
const scroll = () => {
  setTimeout(() => {
    scrollAreaRef.value.setScrollPercentage('vertical', 1, 0)
  }, 100);
}

</script>

<style scoped>
.scroll-area-bg{
  background-image: url('./images/chat-bg.png');
  background-color: transparent; /* Used if the image is unavailable */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}
</style>
