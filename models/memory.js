const Page = require('./page.js')

//constructor memory 
class Memory {
    //constructor
    constructor() {
        this.frames = Array()
        this.pages = Array()

        //replacement counter
        this.time = 0
        this.lack = 0
    }

    setPages(pages) {
        this.pages = pages
    }

    setFrames(n) {
        for (let i = 0; i < n; i++) {
            this.frames.push([])
        }
    }

    replacePage(page, index) {
        this.frames[index][0] = page
        this.lack++
    }

    //find page in memory
    findPageInMemory(page) {
        let iFound = false

        this.frames.forEach(frame => {
            if (page == frame[0]) {
                iFound = true
            }
        })

        return iFound
    }

    runFIFO() {

        //index page replacement controller
        let oldFrameIndex = 0

        //for all pages
        this.pages.forEach(page => {

            this.time++  //update time

            //page is already in memory?
            if (!this.findPageInMemory(page)) {
                this.replacePage(page, oldFrameIndex++) //page replacement
                oldFrameIndex = oldFrameIndex == this.frames.length ? 0 : oldFrameIndex //index page replacement controller
            }
        })

        console.log('lack: ', this.lack)
    }
}

module.exports = Memory
