import React, { Component } from 'react';

export class InputForm extends Component {
    static displayName = InputForm.name;

    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
            return false;
        } else {
            return true;
        };
    }

    render() {
        let categoryOptions = this.props.categories.map((categoryName, index) => {
            return (
                <option key={index}>{categoryName}</option>
            );
        });
        return (
            <div className='InputForm'>
                <input
                    type="text"
                    placeholder="New Item"
                    id="newItemName"
                    value={this.props.newItemName}
                    onChange={this.props.handleChange}
                >
                </input>
                <input
                    type="number"
                    placeholder="Value"
                    id="newItemValue"
                    value={this.props.newItemValue}
                    onChange={this.props.handleChange}
                >
                </input>
                <select
                    id="newItemCategory"
                    value={this.props.newItemCategory}
                    onChange={this.props.handleChange}
                >
                    {categoryOptions}
                </select>
                <button
                    id="newItemAdd"
                    onClick={this.props.addNewItem}
                >
                    Add
            </button>
            </div>
        );
    }
}