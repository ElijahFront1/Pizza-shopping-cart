import React from 'react';
import classNames from 'classnames';
import Button from '../Button';

function PizzaBlock({ id, name, imageUrl, price, types, sizes, onClickAddPizza, addedCount }) {
    const avilableTypes = ['тонкое', 'традиционное'];
    const avilableSizes = [26, 30, 40];

    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(0);

    const onSelectType = index => {
        setActiveType(index);
    }

    const onSelectSize = index => {
        setActiveSize(index);
    }

    const onAddPizza = () => { //Добавляем пиццу в корзину
        const obj = {
            id,
            name,
            imageUrl,
            price,
            size: avilableSizes[activeSize],
            type: avilableTypes[activeType],
        }; 
        onClickAddPizza(obj)
    }



    return (
        <div className="pizza-block">
            <img
                className="pizza-block__image"
                src={imageUrl}
                alt="Pizza"
            />
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {avilableTypes.map((type, index) =>
                        <li
                            key={type}
                            onClick={() => { onSelectType(index) }}
                            className={classNames({
                                active: activeType === index,
                                disabled: !types.includes(index),
                            })}>{type}</li>
                    )}
                </ul>
                <ul>
                    {avilableSizes.map((size, index) =>
                        <li
                            key={size}
                            onClick={() => { onSelectSize(index) }}
                            className={classNames({
                                active: activeSize === index,
                                disabled: !sizes.includes(size),
                            })}>{size} см.</li>
                    )}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{price}</div>
                <Button onClick={onAddPizza} className="button--add" outline> {/*Добавляем пиццу в корзину*/}
                    <span>Добавить</span>
                    {addedCount && <i>{addedCount}</i>}
                </Button>
            </div>
        </div>
    )
}

export default PizzaBlock
