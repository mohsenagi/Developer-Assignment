import React, { Component } from 'react';
import { ReactComponent as DeleteSvg } from "../images/delete.svg";

export class ItemCard extends Component {
    static displayName = ItemCard.name;

    shouldComponentUpdate(nextProps) {
        if (JSON.stringify(this.props) === JSON.stringify(nextProps)) {
            return false;
        } else {
            return true;
        };
    }

    render() {
        let item = this.props.item;
        return (
            <div className='ItemCard'>
                <p>{item.name}</p>
                <div className='ValueDiv'>
                    <p>{`${item.value.toFixed(2)} $`}</p>
                    <DeleteSvg
                        className='DeleteButton'
                        onClick={() => this.props.deleteItem(item.id)}
                    />
                </div>
            </div>
        );
    }
}