import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Categories, SortPopup, PizzaBlock, PizzaLoadingBlock } from '../components';
import { fetchPizzas } from '../redux/actions/pizzas';
import { addPizzaToCart } from '../redux/actions/cart';
import { setCategory, setSortBy } from '../redux/actions/filters';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']; //Массив имен категорий

const sortItems = [ //Массив настроек для фильтрации 
    { name: 'популярности', type: 'popular', order: 'desc' },
    { name: 'цене', type: 'price', order: 'desc' },
    { name: 'алфавиту', type: 'name', order: 'asc' },
];

function Home() {
    const dispatch = useDispatch();//Хук useDispatch() возвращает dispatch метод из редакса, с помощью которого можно диспатчить экшены. В данном случе мы просто присваиваем переменной dispatch функцию useDispatch()
    const items = useSelector(({ pizzas }) => pizzas.items);//useSelector - это аналог mapStateToProps. Хук принимает на вход селектор - метод, который принимает redux state и возвращает из него необходимые данные. В данном случае мы имеем массив пиц.
    const cartItems = useSelector(({ cart }) => cart.items);
    const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);//Здесь isLoaded, свойство из state.pizzas. 
    const { sortBy, category } = useSelector(({ filters }) => filters);//Хук принимает на вход селектор - метод, который принимает redux state и возвращает из него необходимые данные. sortBy = {type: "popular", order: "desc"}
    React.useEffect(() => {//Функция, переданная в useEffect, будет запущена после того, как рендер будет зафиксирован на экране. 
        dispatch(fetchPizzas(sortBy, category))//Диспатчим fetchPizzas экшен с параметрами (sortBy, category)
    }, [category, sortBy]);// Примечание: пустой массив зависимостей [] означает, что этот useEffect будет запущен один раз аналогично componentDidMount()

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index))
    }, []); //[] - ждем первый рендер
    const onSelectSortType = React.useCallback((type) => { //Зачем здесь useCallback
        dispatch(setSortBy(type)) // Диспатчим экшен setSortBy с значением type в которое прилетает значение из onClickSortType по типу {name: "цене", type: "price", order: "desc"}
    }, []);

    const handleAddPizzaToCart = (obj) => {
        dispatch({
            type: 'ADD_PIZZA_CART',
            payload: obj,
        })
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames} /> {/*Передаем в пропсы компонента Categories массив имен категорий*/}
                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map(obj => <PizzaBlock onClickAddPizza={handleAddPizzaToCart} addedCount={cartItems[obj.id] && cartItems[obj.id].length} key={obj.id} isLoading={true} {...obj} />) //Мапим массив пиц
                    : Array(12)
                        .fill(0)
                        .map((__, index) => <PizzaLoadingBlock key={index} />)}
            </div>
        </div>
    )
}
export default Home
