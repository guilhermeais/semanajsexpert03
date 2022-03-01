import ComponentsBuilder from './components.js'

export default class TerminalController {
   constructor() {}

   #onInputReceived(eventEmitter) {
      return function () {
         const message = this.getValue()
         console.log(message)
         this.clearValue()
      }
   }

   #onMessageReceived({ screen, chat }) {
      return msg => {
         console.log('msg', msg.toString())
         chat.addItem(`mensagem: ${msg}`)
         screen.render()
      }
   }

   #registerEvents(eventEmitter, components) {
      eventEmitter.on('message:received', this.#onMessageReceived(components))
   }

   async initializeTable(eventEmitter) {
      const components = new ComponentsBuilder()
         .setScreen({ title: 'HackerChat - Guilherme T.' })
         .setLayoutComponent()
         .setInputComponent(this.#onInputReceived(eventEmitter))
         .setChatComponent()
         .build()

      this.#registerEvents(eventEmitter, components)

      components.input.focus()
      components.screen.render()
   }
}
