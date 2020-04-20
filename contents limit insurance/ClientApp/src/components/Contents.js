import React, { Component } from 'react';
import { ContentItem } from '../models/ContentItem.js';
import { CategoryCard } from './CategoryCard.js';
import { InputForm } from './InputForm.js';
import { fetchJson } from '../scripts/fetch.js';

export class Contents extends Component {
    static displayName = Contents.name;

    constructor(props) {
    super(props);
        this.state = {
            contents: [],
            categories: ['Electronics', 'Clothing', 'Jewellery', 'Furniture'],
            newItemName: "",
            newItemValue: "",
            newItemCategory: 'Electronics',
            loading: true,
            message: ""
        };
    }

    componentDidMount() {
        this.populateContentsData();
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }

    addNewItem = async () => {
        if (this.state.loading) return;
        let { newItemName, newItemCategory, newItemValue } = this.state;
        if (newItemName === "" || newItemValue === "") {
            this.setState({
                message: "Please fill in all input fields"
            });
            return;
        }
        this.setState({
            loading: true
        });
        setTimeout(() => {
            if (this.state.loading) {
                this.setState({
                    message: "Saving ..."
                });
            };
        }, 1000);
        let newItem = new ContentItem(newItemName, newItemCategory, Number(newItemValue));
        try {
            const data = await fetchJson("api/ContentItem", "POST", newItem);
            newItem.id = data.id;
            let contents = this.state.contents;
            contents.push(newItem);
            this.setState({
                contents: contents,
                newItemName: "",
                newItemValue: "",
                loading: false,
                message: ""
            });
        } catch (error) {
            this.setState({
                loading: false,
                message: `We are sorry!! something went wrong while saving data.\n${error}`
            });
        };
    }

    deleteItem = async (id) => {
        if (this.state.loading) return;
        this.setState({
            loading: true
        });
        setTimeout(() => {
            if (this.state.loading) {
                this.setState({
                    message: "Saving ..."
                });
            };
        }, 1000);
        try {
            await fetchJson("api/ContentItem/"+id, "DELETE");
            let contents = this.state.contents.filter(content => content.id !== id);
            this.setState({
                contents: contents,
                loading: false,
                message: ""
            });
        } catch (error) {
            this.setState({
                loading: false,
                message: `We are sorry!! something went wrong while saving data.\n${error}`
            });
        };
    }


    render() {
        let { categories, contents } = this.state;
        const categoriesCards = categories.map((categoryName, index) => {
            let items = contents.filter(content => content.category === categoryName);
            return (
                <CategoryCard
                    categoryName={categoryName}
                    key={index}
                    items={items}
                    deleteItem={this.deleteItem}
                />
            );
        });
        let totalValue = contents.reduce((acc, item) => acc + item.value, 0);
        return (
            <div className='Main'>
                <div className='CardsContainer'>
                    {categoriesCards}
                    <div className='TotalCard'>
                        <p>Total</p>
                        <div className='ValueDiv'>
                            <p>{`${totalValue.toFixed(2)} $`}</p>
                        </div>
                    </div>
                </div>
                <InputForm
                    categories={categories}
                    handleChange={this.handleChange}
                    addNewItem={this.addNewItem}
                    newItemName={this.state.newItemName}
                    newItemCategory={this.state.newItemCategory}
                    newItemValue={this.state.newItemValue}
                />
                <p className="Message"><em>{this.state.message}</em></p>
            </div>
        );
    }

    async populateContentsData() {
        setTimeout(() => {
            if (!this.state.loading) return;
            this.setState({
                message: "Loading ..."
            });
        }, 1000);
        try {
            const data = await fetchJson("api/ContentItem", "GET");
            this.setState({
                contents: data,
                loading: false,
                message: ""
            });
        } catch (error) {
            this.setState({
                loading: false,
                message: `We are sorry!! something went wrong while loading data.\n${error}`
            });
        };
    }
}
