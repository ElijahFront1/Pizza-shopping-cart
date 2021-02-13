import React from 'react'
import PropTypes from 'prop-types';

const Categories = React.memo(function Categories({items, onClickCategory, activeCategory }){// React.memo() позволяет рендерить только те компоненты значение которых изменилось. Принимааем значения из пропс по средством деструктуризации
    return (
        <div>
            <div className="categories">
                <ul>
                    <li className={activeCategory === null ? 'active' : ''} 
                    onClick={() => onClickCategory(null)} >Все</li>

                    {items.map((name, index) => ( // Применяем метод map к массиву categoryNames находящемуся в проп items
                        <li
                        
                            className={activeCategory === index ? 'active' : ''} //Если activeCategory === index то присвоить класс active, иначе '' - ничего.
                            onClick={() => onClickCategory(index)}
                            key={`${name}_${index}`}>
                            {name}
                           
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
})

Categories.propTypes = {
    // activeCategory: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func.isRequired,
}

Categories.defaultProps = {activeCategory: null, items: [] }


export default Categories;
