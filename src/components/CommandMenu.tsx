import React, { useEffect, useState, useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Command } from 'cmdk'
import { Logo, FigmaIcon, SlackIcon, YouTubeIcon } from './Icons'

export function CommandMenu({ close }) {
  const [value, setValue] = useState('linear')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [activeApps, setActiveApps] = useState([])
  const [search, setSearch] = useState('')

  const listRef = useRef(null)

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const appsRes = await fetch(`/api/apps`)
        const apps = await appsRes.json()
        setActiveApps(
          apps
            .map((cat) => {
              return cat.apps
            })
            .flatMap((app) => app),
        )
      } catch (e) {
        console.error(e)
      }
    }

    fetchApps()

    inputRef?.current?.focus()
  }, [])

  return (
    <div className="dark raycast">
      <Command value={value} onValueChange={(v) => setValue(v)}>
        <div cmdk-raycast-top-shine="" />
        <Command.Input
          ref={inputRef}
          value={search}
          onValueChange={setSearch}
          autoFocus
          placeholder="Search for apps and commands..."
        />
        <hr cmdk-raycast-loader="" />
        <Command.List ref={listRef}>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            {activeApps.length > 0 &&
              activeApps.map((app) => (
                <Item
                  key={app.name}
                  value={app.name}
                  url={app.url}
                  close={close}
                >
                  <Logo>
                    <img
                      src={`/icons/${app.img}`}
                      alt={`${app.name} Logo`}
                      height={24}
                      width={24}
                    />
                  </Logo>
                  <div tw="w-full flex justify-between items-center truncate overflow-hidden gap-4">
                    <span>{app.name}</span>
                    <span tw="text-white opacity-30 text-xs whitespace-nowrap truncate overflow-hidden">
                      {app.url.replace('https://', '')}
                    </span>
                  </div>
                </Item>
              ))}
            <Item value="Figma" url="https://figma.com" close={close}>
              <Logo>
                <FigmaIcon />
              </Logo>
              Figma
            </Item>
            <Item value="Slack" url="" close={close}>
              <Logo>
                <SlackIcon />
              </Logo>
              Slack
            </Item>
            <Item value="YouTube" url="" close={close}>
              <Logo>
                <YouTubeIcon />
              </Logo>
              YouTube
            </Item>
          </Command.Group>
          <Command.Group heading="Commands">
            <Item isCommand value="Clipboard History" url="">
              <Logo>
                <ClipboardIcon />
              </Logo>
              Clipboard History
            </Item>
            <Item isCommand value="Import Extension" url="">
              <HammerIcon />
              Import Extension
            </Item>
            <Item isCommand value="Manage Extensions" url="">
              <HammerIcon />
              Manage Extensions
            </Item>
          </Command.Group>
        </Command.List>

        <div cmdk-raycast-footer="" tw="flex justify-between mx-2">
          <img src="/favicon.png" alt="Newtelco Logo" height={20} width={28} />
          <button cmdk-raycast-open-trigger="">
            Open Application
            <kbd>↵</kbd>
          </button>
          {/* <SubCommand */}
          {/*   listRef={listRef} */}
          {/*   selectedValue={value} */}
          {/*   inputRef={inputRef} */}
          {/* /> */}
        </div>
      </Command>
    </div>
  )
}

function Item({
  children,
  value,
  url,
  close,
  isCommand = false,
}: {
  children: React.ReactNode
  value: string
  url?: string
  isCommand?: boolean
  close?: () => void
}) {
  const handleSelect = (url, value) => {
    if (url) {
      window.open(url, value)
      close()
    }
  }

  return (
    <Command.Item value={value} onSelect={() => handleSelect(url, value)}>
      {children}
      <span cmdk-raycast-meta="">{isCommand ? 'Command' : 'Application'}</span>
    </Command.Item>
  )
}

function SubCommand({
  inputRef,
  listRef,
  selectedValue,
}: {
  inputRef: React.RefObject<HTMLInputElement>
  listRef: React.RefObject<HTMLElement>
  selectedValue: string
}) {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function listener(e: KeyboardEvent) {
      e.preventDefault()
      if (e.key === 'z' && (e.metaKey || e.ctrlKey)) {
        console.log('KEY EVENT: ctrl+z')
        setOpen((o) => !o)
      }
    }

    document.addEventListener('keydown', listener)

    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, [])

  React.useEffect(() => {
    const el = listRef.current

    if (!el) return

    if (open) {
      el.style.overflow = 'hidden'
    } else {
      el.style.overflow = ''
    }
  }, [open, listRef])

  return (
    <Popover.Root open={open} onOpenChange={setOpen} modal>
      <Popover.Trigger
        cmdk-raycast-subcommand-trigger=""
        onClick={() => setOpen(true)}
        aria-expanded={open}
      >
        Actions
        <kbd>⌘</kbd>
        <kbd>K</kbd>
      </Popover.Trigger>
      <Popover.Content
        side="top"
        align="end"
        className="raycast-submenu"
        sideOffset={16}
        alignOffset={0}
        onCloseAutoFocus={(e) => {
          e.preventDefault()
          inputRef?.current?.focus()
        }}
      >
        <Command>
          <Command.List>
            <Command.Group heading={selectedValue}>
              <SubItem shortcut="↵">
                <WindowIcon />
                Open Application
              </SubItem>
              <SubItem shortcut="⌘ ↵">
                <FinderIcon />
                Show in Finder
              </SubItem>
              <SubItem shortcut="⌘ I">
                <FinderIcon />
                Show Info in Finder
              </SubItem>
              <SubItem shortcut="⌘ ⇧ F">
                <StarIcon />
                Add to Favorites
              </SubItem>
            </Command.Group>
          </Command.List>
          <Command.Input placeholder="Search for actions..." />
        </Command>
      </Popover.Content>
    </Popover.Root>
  )
}

function SubItem({
  children,
  shortcut,
}: {
  children: React.ReactNode
  shortcut: string
}) {
  return (
    <Command.Item>
      {children}
      <div cmdk-raycast-submenu-shortcuts="">
        {shortcut.split(' ').map((key) => {
          return <kbd key={key}>{key}</kbd>
        })}
      </div>
    </Command.Item>
  )
}

function TerminalIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  )
}

function WindowIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 4.75V3.75C14.25 2.64543 13.3546 1.75 12.25 1.75H3.75C2.64543 1.75 1.75 2.64543 1.75 3.75V4.75M14.25 4.75V12.25C14.25 13.3546 13.3546 14.25 12.25 14.25H3.75C2.64543 14.25 1.75 13.3546 1.75 12.25V4.75M14.25 4.75H1.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FinderIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 4.75V6.25M11 4.75V6.25M8.75 1.75H3.75C2.64543 1.75 1.75 2.64543 1.75 3.75V12.25C1.75 13.3546 2.64543 14.25 3.75 14.25H8.75M8.75 1.75H12.25C13.3546 1.75 14.25 2.64543 14.25 3.75V12.25C14.25 13.3546 13.3546 14.25 12.25 14.25H8.75M8.75 1.75L7.08831 7.1505C6.9202 7.69686 7.32873 8.25 7.90037 8.25C8.36961 8.25 8.75 8.63039 8.75 9.09963V14.25M5 10.3203C5 10.3203 5.95605 11.25 8 11.25C10.0439 11.25 11 10.3203 11 10.3203"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.43376 2.17103C7.60585 1.60966 8.39415 1.60966 8.56624 2.17103L9.61978 5.60769C9.69652 5.85802 9.92611 6.02873 10.186 6.02873H13.6562C14.2231 6.02873 14.4665 6.75397 14.016 7.10088L11.1582 9.3015C10.9608 9.45349 10.8784 9.71341 10.9518 9.95262L12.0311 13.4735C12.2015 14.0292 11.5636 14.4777 11.1051 14.1246L8.35978 12.0106C8.14737 11.847 7.85263 11.847 7.64022 12.0106L4.89491 14.1246C4.43638 14.4777 3.79852 14.0292 3.96889 13.4735L5.04824 9.95262C5.12157 9.71341 5.03915 9.45349 4.84178 9.3015L1.98404 7.10088C1.53355 6.75397 1.77692 6.02873 2.34382 6.02873H5.81398C6.07389 6.02873 6.30348 5.85802 6.38022 5.60769L7.43376 2.17103Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <div cmdk-raycast-clipboard-icon="">
      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.07512 2.75H4.75C3.64543 2.75 2.75 3.64543 2.75 4.75V12.25C2.75 13.3546 3.64543 14.25 4.75 14.25H11.25C12.3546 14.25 13.25 13.3546 13.25 12.25V4.75C13.25 3.64543 12.3546 2.75 11.25 2.75H9.92488M9.88579 3.02472L9.5934 4.04809C9.39014 4.75952 8.73989 5.25 8 5.25V5.25C7.26011 5.25 6.60986 4.75952 6.4066 4.04809L6.11421 3.02472C5.93169 2.38591 6.41135 1.75 7.07573 1.75H8.92427C9.58865 1.75 10.0683 2.3859 9.88579 3.02472Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function HammerIcon() {
  return (
    <div cmdk-raycast-hammer-icon="">
      <svg
        width="32"
        height="32"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.73762 6.19288L2.0488 11.2217C1.6504 11.649 1.6504 12.3418 2.0488 12.769L3.13083 13.9295C3.52923 14.3568 4.17515 14.3568 4.57355 13.9295L9.26238 8.90071M6.73762 6.19288L7.0983 5.80605C7.4967 5.37877 7.4967 4.686 7.0983 4.25872L6.01627 3.09822L6.37694 2.71139C7.57213 1.42954 9.50991 1.42954 10.7051 2.71139L13.9512 6.19288C14.3496 6.62017 14.3496 7.31293 13.9512 7.74021L12.8692 8.90071C12.4708 9.328 11.8248 9.328 11.4265 8.90071L11.0658 8.51388C10.6674 8.0866 10.0215 8.0866 9.62306 8.51388L9.26238 8.90071M6.73762 6.19288L9.26238 8.90071"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default CommandMenu
