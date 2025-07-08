import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, MenuItem } from '@mui/material'
import {
	action,
	add,
	compas,
	compasActive,
	homeIcon,
	homeIconActive,
	instagramText,
	like,
	likeActive,
	message,
	messageActive,
	problemIcon,
	savedIcon,
	searchIcon,
	searchIconActive,
	setting,
	settings,
	threads,
	video,
	videoActive,
} from '@/assets/icons/layout/svg'
import { useTranslation } from 'react-i18next'
import Switcher from '@/components/shared/switcher/switcher'

export default function Bar() {
	let { pathname } = useLocation()
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleClick = event => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}
	const { t } = useTranslation()


	return (
		<div>
			<section className='w-[320px] h-[100%] 3xl:w-[230px] fixed md:hidden border-r-[2px] border-r-[solid] border-[#eee]'>
				<div className='sideBar h-[100%] pb-[100px]'>
					<div className='m-auto pt-[20px] ml-[20px] flex  pb-[10px] mt-[20px]'>
						{instagramText}
					</div>
					<div className='flex flex-col justify-between h-[100%]'>
						<div className='flex flex-col gap-[0.5rem] mt-4'>
							<Link to={'/'}>
								<div className='flex items-center super-svg  gap-4 w-[90%]  m-auto rounded-[8px] h-[52px]  hover:bg-[rgba(0,0,0,0.05)] px-4'>
									{pathname == '/' ? homeIcon : homeIconActive}
									<p
										className={`${
											pathname == '/' ? 'font-[700]' : 'font-[400]'
										} text-[16px] block`}
									>
										{t('layout.home')}
									</p>
								</div>
							</Link>

							<div className='flex super-svg items-center gap-4 w-[90%]  m-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4 '>
								{pathname == '/search' ? searchIcon : searchIconActive}

								<p
									className={`${
										pathname == '/search' ? 'font-[700]' : 'font-[400]'
									} text-[16px] block`}
								>
									{' '}
									{t('layout.search')}
								</p>
							</div>

							<Link to={'/explore'}>
								<div className='flex super-svg items-center gap-4 w-[90%]  m-auto rounded-[8px]  hover:bg-[rgba(0,0,0,0.05)] h-[52px] px-4 '>
									{pathname == '/explore' ? compas : compasActive}

									<p
										className={`${
											pathname == '/explore' ? 'font-[700]' : 'font-[400]'
										} text-[16px] block`}
									>
										{t('layout.explore')}
									</p>
								</div>
							</Link>

							<Link to={'/reels'}>
								<div className='flex super-svg items-center gap-4 w-[90%]  m-auto rounded-[8px]  hover:bg-[rgba(0,0,0,0.05)] h-[52px] px-4 '>
									{pathname == '/reels' ? video : videoActive}
									<p
										className={`${
											pathname == '/reels' ? 'font-[700]' : 'font-[400]'
										} text-[16px] block`}
									>
										{' '}
										{t('layout.reels')}
									</p>
								</div>
							</Link>

							<Link to={'/chats'}>
								<div className='flex super-svg items-center gap-4 w-[90%]  m-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4 '>
									{pathname == '/chats' ? message : messageActive}
									<p
										className={`${
											pathname == '/chats' ? 'font-[700]' : 'font-[400]'
										} text-[16px] block`}
									>
										{' '}
										{t('layout.message')}
									</p>
								</div>
							</Link>

							<div className='flex super-svg items-center gap-4 w-[90%]  m-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4 '>
								{pathname == '/notification' ? like : likeActive}

								<p
									className={`${
										pathname == '/notification' ? 'font-[700]' : 'font-[400]'
									} text-[16px] block`}
								>
									{t('layout.notification')}
								</p>
							</div>

							<div className='flex font-[400] hover:font-[700] super-svg items-center gap-4  w-[90%]  m-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4 '>
								{add}
								<p className='text-[16px] block'>{t('layout.create')}</p>
							</div>

							<Link to={'/profile'}>
								<div className='flex super-img items-center gap-4  w-[90%]  m-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4'>
									<Image
										className={`${
											pathname == '/profile'
												? 'border-[2px] border-[solid] border-[black] rounded-[50%]'
												: 'font-[400]'
										} text-[16px] block`}
										src={"/images/profile.jpg"}
										alt=''
									/>
									<p
										className={`${
											pathname == '/profile' ? 'font-[700]' : 'font-[400]'
										} text-[16px] block `}
									>
										{' '}
										{t('layout.profile')}
									</p>
								</div>
							</Link>
						</div>
						<div>
							<div className='flex super-img items-center gap-4  w-[90%]  m-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4'>
								{threads}
								<p
									className={`${
										pathname == '/profile' ? 'font-[700]' : 'font-[400]'
									} text-[16px] block `}
								>
									{' '}
									{t('layout.threads')}
								</p>
							</div>
							<div className='super-img font-[400] hover:font-[700] flex super-svg items-center gap-4 w-[90%] mx-auto rounded-[8px] h-[52px] hover:bg-[rgba(0,0,0,0.05)] px-4 '>
								<button onClick={handleClick} className='flex gap-5'>
									{settings}
									<p className='text-[16px] font-sans text-black block dark:text-[white] capitalize'>
										{t('layout.more')}
									</p>
								</button>
								<Menu
									// className='w-[100px] h-[100px]'
									id='fade-button'
									sx={{
										padding: '0px',
										borderRadius: '10px',
										'.css-6hp17o-MuiList-root-MuiMenu-list': {
											padding: '0px',
											borderRadius: '10px',
										},
										'.MuiPaper-root': {
											borderRadius: '16px',
											width: '300px',
											height: '475px',
											boxShadow: '0 4px 12px  rgba(0, 0, 0, 0.15)',
										},
									}}
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'center',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'center',
									}}
								>
									<div className='pb-[10px] z-10 bg-[#fff] dark:text-white dark:bg-[#262626] dark:border-0 rounded-[16px] shadow-lg p-[10px] border-[1px] w-[300px] h-[475px]'>
										<div className='flex flex-col gap-[7px]'>
											<Link to={'/setting'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													{setting}
													<p>{t('layout.mores.setting')}</p>
												</MenuItem>
											</Link>
											<Link to={'/actions'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													{action}
													<p>{t('layout.mores.action')}</p>
												</MenuItem>
											</Link>
											<Link to={'/saved'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													{savedIcon}
													<p>{t('layout.mores.saved')}</p>
												</MenuItem>
											</Link>
											<Link to={'/switch-mode'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													<Switcher />
													<p>{t('layout.mores.mode')}</p>
												</MenuItem>
											</Link>
											<Link to={'/report'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													{problemIcon}
													<p>{t('layout.mores.problem')}</p>
												</MenuItem>
											</Link>
											<hr className='margin-top-[8px] margin-bottom-[8px] bg-[#dbdbdbd4] h-[6px] w-[300px] ml-[-10px]' />
											<Link to={'/switch-account'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													<p>{t('layout.mores.switch')}...</p>
												</MenuItem>
											</Link>
											<hr className='margin-top-[10px] margin-bottom-[10px] bg-[#dbdbdb80] h-[0.500px] w-[300px] ml-[-10px]' />

											<Link to={'/login'}>
												<MenuItem
													sx={{
														padding: '16px',
														display: 'flex',
														gap: '10px',
														borderRadius: '8px',
													}}
												>
													<p>{t('layout.mores.exit')}</p>
												</MenuItem>
											</Link>
										</div>
									</div>
								</Menu>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className='3xl:ml-[230px] ml-[320px]'>
				<Outlet />
			</div>
		</div>
	)
}
