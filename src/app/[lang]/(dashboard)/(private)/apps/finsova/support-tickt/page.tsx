'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import { ReactElement } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Chip from '@mui/material/Chip'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

// Icons
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SupportTickt from '@/views/finsova/supporttik/support-tickt'

// Types
export interface SupportTicket {
  id: string
  ticketNumber: string
  service: string
  txnDate: string
  referenceNumber: string
  subject: string
  dateCreated: string
  lastUpdateDate: string
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED'
}

const SupportTicketPage = (): ReactElement => {
  const params = useParams()
  
  // States
  const [searchTerm, setSearchTerm] = useState('')
  const [includeClosed, setIncludeClosed] = useState(false)
  const [entriesPerPage, setEntriesPerPage] = useState(100)
  const [sortField, setSortField] = useState<string>('lastUpdateDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  
  // Mock data - replace with actual API call
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'warning'
      case 'IN_PROGRESS':
        return 'info'
      case 'RESOLVED':
        return 'success'
      case 'CLOSED':
        return 'default'
      default:
        return 'default'
    }
  }
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'OPEN':
        return 'OPEN'
      case 'IN_PROGRESS':
        return 'IN PROGRESS'
      case 'RESOLVED':
        return 'RESOLVED'
      case 'CLOSED':
        return 'CLOSED'
      default:
        return status
    }
  }
  
  const renderSortIcon = (field: string) => {
    if (sortField !== field) {
      return <KeyboardArrowUpIcon sx={{ opacity: 0.3 }} />
    }
    return sortDirection === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
  }

  return (
   
    <SupportTickt supprtTicketData ={tickets} /> 
  )
}

export default SupportTicketPage
