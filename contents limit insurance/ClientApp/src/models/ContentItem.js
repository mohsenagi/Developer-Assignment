export class ContentItem {
    constructor(name, category, value, id = 0) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.value = value;
    }
}