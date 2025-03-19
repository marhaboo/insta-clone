import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Menu, MenuItem, Tooltip, tooltipClasses } from '@mui/material'
import Profile from '@/assets/icons/layout/instagramDefaultProfile.jpg'
import {
	action,
	add,
	compas,
	compasActive,
	homeIcon,
	homeIconActive,
	instagramMiniLogo,
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
import Switcher from '@/components/shared/switcher/switcher'
import { useTranslation } from 'react-i18next'
import styled from '@emotion/styled'

export default function MiniBar() {
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

	const LightTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(() => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: 'white',
			color: 'black',
			boxShadow: '0 0 5px 1px rgba(0,0,0, .0975)',
			fontSize: 11,
			".MuiTooltip-arrow": {
				color: 'white'
			}
		},
	}))

	return (
		<div className='flex'>
			<section className='flex justify-center w-[50px] border-r-[2px] border-r-[solid] border-[#eee] h-[100vh]'>
				<div className='sideBar h-[100%] pb-[100px]'>
					<div className='m-auto flex justify-center pb-[10px] mt-[20px]'>
						{instagramMiniLogo}
					</div>
					<div className='flex flex-col justify-between h-[100%]'>
						<div className='flex flex-col gap-[0.5rem] mt-4'>
							<LightTooltip
								sx={{ backgroundColor: 'red' }}
								title={t('layout.home')}
								placement='right'
								arrow
							>
								<Link to={'/'}>
									<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
										{pathname == '/' ? homeIcon : homeIconActive}
									</div>
								</Link>
							</LightTooltip>
							<LightTooltip title={t('layout.search')} placement='right' arrow>
								<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
									{pathname == '/search' ? searchIcon : searchIconActive}
								</div>
							</LightTooltip>

							<LightTooltip title={t('layout.explore')} placement='right' arrow>
								<Link to={'/explore'}>
									<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
										{pathname == '/explore' ? compas : compasActive}
									</div>
								</Link>
							</LightTooltip>

							<LightTooltip title={t('layout.reels')} placement='right' arrow>
								<Link to={'/reels'}>
									<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
										{pathname == '/reels' ? video : videoActive}
									</div>
								</Link>
							</LightTooltip>

							<LightTooltip title={t('layout.message')} placement='right' arrow>
								<Link to={'chats'}>
									<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
										{pathname == '/chats' ? message : messageActive}
									</div>
								</Link>
							</LightTooltip>

							<LightTooltip
								title={t('layout.notification')}
								placement='right'
								arrow
							>
								<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
									{pathname == '/notification' ? like : likeActive}
								</div>
							</LightTooltip>

							<LightTooltip title={t('layout.create')} placement='right' arrow>
								<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
									{add}
								</div>
							</LightTooltip>

							<LightTooltip title={t('layout.profile')} placement='right' arrow>
								<Link to={'/profile'}>
									<div className='flex items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
										<img
											className={`${
												pathname == '/profile'
													? 'border-[2px] border-[solid] border-[black] rounded-[50%]'
													: 'font-[400]'
											} text-[16px] block w-[25px] h-[25px]`}
											src={Profile}
											alt=''
										/>
									</div>
								</Link>
							</LightTooltip>
						</div>
						<div className='flex flex-col items-center super-svg  gap-4 w-[90%] rounded-[8px] h-[52px] px-0 m-[0] justify-center'>
							<LightTooltip title={t('layout.threads')} placement='right' arrow>
								<button onClick={handleClick} className='flex gap-5'>
									{threads}
								</button>
							</LightTooltip>
							<LightTooltip title={t('layout.more')} placement='right' arrow>
								<button onClick={handleClick} className='flex gap-5'>
									{settings}
								</button>
							</LightTooltip>

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
												<p>Сохраненное</p>
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
												<p>{t('layout.mores.switch')}</p>
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
			</section>
			<div className='ml-[0px]'>
				<Outlet />
			</div>
		</div>
	)
}
