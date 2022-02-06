import {category, wordData} from "../types/categories"
import path from "path"
import fs from "fs"

class WordsService {
    static words: wordData = {
        names: [],
        verbs: [],
        locations: []
    }

    static async initalize(): Promise<void> {
        console.log("Initalizing words..")

        try {
            let data = fs.readFileSync(path.resolve(__dirname, `../data.json`), 'utf8')
            let parsedData = JSON.parse(data)
    
            this.words = {
                names: parsedData.names,
                verbs: parsedData.verbs,
                locations: parsedData.locations
            }
            
            console.log("Successfully processed words!")
        } catch (error) {
            console.log("ERROR " + error)
        }
    }

    static formatInput(words: string): string[] {
        return words.split(',').map((word) => {
            return word.trim()
        })
    }

    static checkForDuplicates(words: string[], wordList: string[]): boolean[] {
        let duplicatesArray: boolean[] = []
        
        words.forEach((word) => {
            if (wordList.indexOf(word) !== -1) {
                duplicatesArray.push(true)
            } else {
                duplicatesArray.push(false)
            }
        })

        return duplicatesArray
    }

    static addWords(words: string[], category: string): boolean[] {
        let wordList;
        let duplicateList = [];

        if (category === "names") {
            wordList = this.words.names
        } else if (category === "verbs") {
            wordList = this.words.verbs
        } else if (category === "locations") {
            wordList = this.words.locations
        } else {
            throw new Error("Category is invalid!")
        }

        for (let i = 0; i < words.length; i++) {
            if (wordList.indexOf(words[i].toLowerCase()) === -1) {
                wordList.push(words[i].toLowerCase())
                duplicateList.push(false)
            } else {
                duplicateList.push(true)
            }
        }

        return duplicateList
    }

    static randomInt(max: number) {
        return Math.floor(Math.random() * max)
    }

    static generatePrompt(): string {
        let namesLength = this.words.names.length
        let verbsLength = this.words.verbs.length
        let locationsLength = this.words.locations.length

        let name = this.words.names[this.randomInt(namesLength)]
        let verb = this.words.verbs[this.randomInt(verbsLength)]
        let location = this.words.locations[this.randomInt(locationsLength)]

        return `${name} ${verb} ${location}`
    }

    static save(): void {
        console.log("Saving words to disk..")

        try {
            fs.writeFileSync(path.resolve(__dirname, `../data.json`), JSON.stringify(this.words))
            console.log("Successfully saved words to disk!")
        } catch (error) {
            console.log("Failed to save words to disk.. writing to console")
            console.log(this.words)
            console.log(error)
        }

    }
}

export default WordsService