import React from 'react';
import PropTypes from 'prop-types';

const SortPopup = React.memo(function SortPopup({ items, onClickSortType, activeSortType }) {//Если ваш компонент всегда рендерит одно и то же при неменяющихся пропсах, вы можете обернуть его в вызов React.memo для повышения производительности в некоторых случаях, мемоизируя тем самым результат. Это значит, что React будет использовать результат последнего рендера, избегая повторного рендеринга. ВОПРОС: Зачем мне здесь r.m. если - React.memo затрагивает только изменения пропсов. Если функциональный компонент обёрнут в React.memo и использует useState или useContext, он будет повторно рендериться при изменении состояния или контекста? activeSortType = popular
    const [visiblePopup, setVisiblePopap] = React.useState(false); //visiblePopup - название переменной состояния. setVisiblePopap
    const sortRef = React.useRef();
    const activeLabel = items.find((obj) => obj.type === activeSortType).name;

    const toggleVisiblePopup = () => {
        setVisiblePopap(!visiblePopup); // При клике по сортировке возвращает true при повторном false. toggleVisiblePopup отвечает за открытие и скрытие меню сортировки
    };

    const handleOutsideClick = (event) => { //event = MouseEvent {isTrusted: true, screenX: 1693, screenY: -141, clientX: 327, clientY: 94, …}
        const path = event.path || (event.composedPath && event.composedPath()); //Смысл вот этой конструкции event.path || (event.composedPath && event.composedPath());  ?
        if (!path.includes(sortRef.current)) {
            setVisiblePopap(false); // Если путь из эвента клик не совпадает с ссылкой из рефа то - setVisiblePopap(false)
        }
    }

    const onSelectItem = index => { //В index прилетает обьект который соответствует li по которому кликнули
        if (onClickSortType) { // Зачем здесь if?
            onClickSortType(index); //index = {name: "цене", type: "price", order: "desc"} 
        }
        setVisiblePopap(false);
    }

    React.useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)//Обработка клика по body
    }, []);

    return (
        <div ref={sortRef} className="sort"> {/*определяем значение хука useRef*/}
            <div className="sort__label">
                <svg
                    className={visiblePopup ? 'rotated' : ' '}
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={toggleVisiblePopup}>{activeLabel}</span> 
            </div>
            {visiblePopup && <div className="sort__popup"> {/*в JavaScript выражение true && expression всегда вычисляется как expression, а выражение false && expression — как false. */}
                <ul>
                    {items && // Зачем здесь эта строка
                        items.map((obj, index) => (
                            <li onClick={() => onSelectItem(obj)}
                                className={activeSortType === obj.type ? 'active' : ''} //Здесь все завязано на отображение бэграунда активного li
                                key={`${obj.type}_${index}`}> {/*Эта строка исправляет предупреждение*/}
                                {obj.name}
                            </li>
                        ))}
                </ul>
            </div>}
        </div>
    )
})

SortPopup.propTypes = {
    activeSortType: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClickSortType: PropTypes.func.isRequired,
}

SortPopup.defaultProps = {
    items: [],
}

export default SortPopup;