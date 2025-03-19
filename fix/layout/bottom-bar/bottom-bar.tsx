import { Link, Outlet, useLocation } from "react-router-dom"
import Profile from '@/assets/icons/layout/instagramDefaultProfile.jpg'
import {
	add,
	compas,
	compasActive,
	homeIcon,
	homeIconActive,
	message,
	messageActive,
	video,
	videoActive,
} from '@/assets/icons/layout/svg'

export default function BottomBar(){
	let { pathname } = useLocation()
  return (
		<div>
			<Outlet />
			<section className='fixed w-[100%] z-[10] bottom-0'>
				<div className=''>
					<div className='flex gap-[0.5rem] mt-4 align-bottom bg-white justify-evenly'>
						<Link className='block' to={'/'}>
							<div className='flex items-center gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
								{pathname == '/' ? homeIcon : homeIconActive}
							</div>
						</Link>
						<Link to={'/explore'}>
							<div className='flex items-center gap-4 w-[90%]  m-auto rounded-[8px] h-[52px] xl:px-0 xl:m-[0] xl:justify-center'>
								{pathname == '/explore' ? compas : compasActive}
							</div>
						</Link>

						<Link to={'/reels'}>
							<div className='flex items-center gap-4 rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
								{pathname == '/reels' ? video : videoActive}
							</div>
						</Link>

						<div className='flex items-center gap-4 rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
							{add}
							<p className='text-[16px] block xl:hidden'> Create</p>
						</div>
						<Link to={'/chats'}>
							<div className='flex items-center gap-4 rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
								{pathname == '/chats' ? message : messageActive}
							</div>
						</Link>
						<Link to={'/profile'}>
							<div className='flex items-center gap-4 rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
								<img
									className={`${
										pathname == '/profile'
											? 'border-[2px] border-[solid] border-[black] rounded-[50%] w-[25px] h-[25px]'
											: 'font-[400] w-[25px] h-[25px]'
									}`}
									src={Profile}
									alt=''
								/>
							</div>
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}