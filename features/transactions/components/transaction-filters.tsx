'use client'

import React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TransactionFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  type: string
  onTypeChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  onClear: () => void
}

export const TransactionFilters = ({
  search,
  onSearchChange,
  type,
  onTypeChange,
  category,
  onCategoryChange,
  onClear,
}: TransactionFiltersProps) => {
  const isFiltered = search !== '' || type !== 'all' || category !== 'all'

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 bg-muted/30 p-4 rounded-xl border border-border/50">
      <div className="flex-1 min-w-0 sm:min-w-[240px] relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
        <Input
          placeholder="Search by description..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-10 w-full bg-background border-border focus-visible:ring-primary rounded-lg shadow-sm"
        />
      </div>

      <div className="w-full sm:w-[160px]">
        <Select value={type} onValueChange={onTypeChange}>
          <SelectTrigger className="w-full h-10 bg-background border-border focus:ring-primary rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />
              <SelectValue placeholder="All Types" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-md border-border">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income Only</SelectItem>
            <SelectItem value="expense">Expense Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-[160px]">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-full h-10 bg-background border-border focus:ring-primary rounded-lg shadow-sm">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground font-medium italic">Category:</span>
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-lg shadow-md border-border">
            <SelectItem value="all">Any Category</SelectItem>
            <SelectItem value="Food">Food</SelectItem>
            <SelectItem value="Transport">Transport</SelectItem>
            <SelectItem value="Salary">Salary</SelectItem>
            <SelectItem value="Rent">Rent</SelectItem>
            <SelectItem value="Leisure">Leisure</SelectItem>
            <SelectItem value="Health">Health</SelectItem>
            <SelectItem value="Shopping">Shopping</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          className="h-9 px-3 gap-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 font-medium transition-all"
        >
          <XCircle className="h-4 w-4" />
          Clear
        </Button>
      )}
    </div>
  )
}
