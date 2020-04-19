import React, { Component } from 'react';
import { ItemCard } from './ItemCard.js';

export class CategoryCard extends Component {
    static displayName = CategoryCard.name;

    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
            return false;
        } else {
            return true;
        };
    }

    render() {
        let categoryName = this.props.categoryName;
        let items = this.props.items;
        let totalValue = items.reduce((acc, item) => acc + item.value, 0);
        const itemsCards = items.map((item) => {
            return (
                <ItemCard
                    key={item.id}
                    item={item}
                    deleteItem={this.props.deleteItem}
                />
            );
        });
        return (
            <div className='CategoryCard'>
                <p>{categoryName}</p>
                <div className='ValueDiv'>
                    <p>{`${totalValue.toFixed(2)} $`}</p>
                </div>
                {itemsCards}
            </div>
        );
    }
}