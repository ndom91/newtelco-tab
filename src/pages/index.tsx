import React, { useEffect, useState } from 'react'
import {
  AnimatePresence,
  // AnimateSharedLayout,
  motion,
  MotionProps,
  // useInView,
} from 'framer-motion'
import {
  SelectedCategory,
  GoogleWorkspace,
  CommandMenu,
  AppList,
  Layout,
} from '@/components/index'

function CommandWrapper(
  props: MotionProps & { onClick: (e: any) => any; children: React.ReactNode },
) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      style={{
        height: 475,
        width: 500,
        position: 'absolute',
        zIndex: '9999',
        top: 'calc(50% - 250px)',
        left: 'calc(50% - 250px)',
      }}
      {...props}
    />
  )
}

const IndexPage: React.FC = (): React.ReactElement => {
  const [activeCategory, setActiveCategory] = useState('general')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    function listener(e: KeyboardEvent) {
      e.preventDefault()
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        console.log('KEY EVENT: ctrl+k')
        setOpen((o) => !o)
      }
    }

    function listenerEsc(e: KeyboardEvent) {
      e.preventDefault()
      if (e.key === 'Escape') {
        console.log('KEY EVENT: esc')
        setOpen((o) => !o)
      }
    }

    document.addEventListener('keydown', listener)
    document.addEventListener('keydown', listenerEsc)

    return () => {
      document.removeEventListener('keydown', listener)
      document.removeEventListener('keydown', listenerEsc)
    }
  }, [])

  const logAndClose = () => {
    console.log('CLICKED CLOSE!')
    setOpen(!open)
  }

  return (
    <SelectedCategory.Provider value={{ activeCategory, setActiveCategory }}>
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={() => null}
      >
        {open && (
          <>
            <div
              onClick={logAndClose}
              tw="z-[9998] w-full h-full fixed bg-black bg-opacity-75 transition duration-300"
            >
              <CommandWrapper onClick={(e) => e.stopPropagation()}>
                <CommandMenu />
              </CommandWrapper>
            </div>
          </>
        )}
      </AnimatePresence>
      <Layout>
        <div tw="flex h-full p-2 sm:p-6 lg:p-8 justify-center sm:justify-between">
          <AppList category={activeCategory} />
          <GoogleWorkspace />
        </div>
      </Layout>
    </SelectedCategory.Provider>
  )
}

export default IndexPage
