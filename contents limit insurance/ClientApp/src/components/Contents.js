import React, { Component } from 'react';
import { ContentItem } from '../models/ContentItem.js';
import { CategoryCard } from './CategoryCard.js';
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
            message: "Loading..."
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
        this.setState({
            loading: true
        });
        let newItem = new ContentItem(this.state.newItemName, this.state.newItemCategory, Number(this.state.newItemValue));
        try {
            const data = await fetchJson("api/ContentItem", "POST", newItem);
            newItem.id = data.id;
            let contents = this.state.contents;
            contents.push(newItem)
            this.setState({
                contents: contents,
                newItemName: "",
                newItemValue: "",
                loading: false
            });
        } catch (error) {
            this.setState({
                message: `We are sorry!! something went wrong while saving data.\n${error}`
            })
        }
    }

    deleteItem = async (id) => {
        if (this.state.loading) return;
        this.setState({
            loading: true
        });
        try {
            const data = await fetchJson("api/ContentItem/"+id, "DELETE");
            let contents = this.state.contents.filter(content => content.id !== id);
            this.setState({
                contents: contents,
                loading: false
            });
        } catch (error) {
            this.setState({
                message: `We are sorry!! something went wrong while saving data.\n${error}`
            })
        }
    }


    render() {
        let { categories, contents } = this.state;
        let categoriesCards = categories.map((categoryName, index) => {
            let items = contents.filter(content => content.category === categoryName);
            return (
                <CategoryCard
                    categoryName={categoryName}
                    key={index}
                    items={items}
                    deleteItem={this.deleteItem}
                />
            )
        });
        let totalValue = contents.reduce((acc, item) => acc + item.value, 0);
        let categoryOptions = categories.map((categoryName, index) => {
            return (
                <option key={index}>{categoryName}</option>
            )
        });

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
                <div className='InputForm'>
                    <input
                        type="text"
                        placeholder="New Item"
                        id="newItemName"
                        value={this.state.newItemName}
                        onChange={this.handleChange}
                    >
                    </input>
                    <input
                        type="number"
                        placeholder="Value"
                        id="newItemValue"
                        value={this.state.newItemValue}
                        onChange={this.handleChange}
                    >
                    </input>
                    <select
                        id="newItemCategory"
                        value={this.state.newItemCategory}
                        onChange={this.handleChange}
                    >
                        {categoryOptions}
                    </select>
                    <button
                        id="newItemAdd"
                        onClick={this.addNewItem}
                    >
                        Add
                    </button>
                </div>
                {this.state.loading && <p className="Message"><em>{this.state.message}</em></p>}
            </div>
        );
    }

    async populateContentsData() {
        try {
            const data = await fetchJson("api/ContentItem", "GET");
            await this.setState({ contents: data, loading: false });
        } catch (error) {
            this.setState({
                message: `We are sorry!! something went wrong while loading data.\n${error}`
            })
        }
    }
}
