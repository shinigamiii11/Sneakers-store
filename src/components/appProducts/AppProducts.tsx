import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHook';
import { fetchSneakers } from '../../features/apiSlice';
import { addItemsInCart } from '../../features/cartSlice';
import { Sneakers } from '../../models/sneakers';

import Spinner from '../spinner/Loader';

import './appProducts.scss';
import plus from '../../resources/img/plus.svg';



const AppProducts: React.FC = () => {
	const dispatch = useAppDispatch();
	const { sneaker, status  } = useAppSelector(state => state.sneakers);

	useEffect(() => {
		dispatch(fetchSneakers());
	}, []);

	const addItemsToCart = (sneaker: Sneakers): void =>  {
		dispatch(addItemsInCart(sneaker))
	}

	const spinner: JSX.Element[] = [...new Array(12)].map((i: number) => <Spinner key={i} />)

	const sneakerProducts: JSX.Element[] = sneaker.map((sneakerCard: Sneakers): JSX.Element => {
		return (
			<div className='card' key={sneakerCard.id}>
            <img width={133} height={112} src={sneakerCard.image} alt={sneakerCard.title} />
            <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
            <div className='card__bottom'>
                <div className='card__inner'>
                    <p className='card__price'>price:</p>
                    <b>{sneakerCard.price}$</b>
                </div>
                <button 
					onClick={() => addItemsToCart(sneakerCard)}
                    className='card__btn' >
                    <img src={plus} width={11} height={11} alt='plus' />
                </button>
            </div>
        </div>
		)
	})


	return (
		<div>
			<div className="sneakers">
				{status ? spinner : sneakerProducts}
			</div>
		</div>
	)
}

export default AppProducts;