import { useState } from 'react'
import { availableServices } from '../data/availableServices'
import type { ServiceItem } from '../types'
import { AddServiceForm } from './AddServiceForm'
import { ServicesTable } from './ServicesTable'

export const ProjectBuilder = () => {
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<number | ''>('')
  const [quantity, setQuantity] = useState(1)

  const totalPrice = selectedServices.reduce((acc, item) => acc + item.service.price * item.quantity, 0)

  const addService = () => {
    if (selectedServiceId === '') return

    const service = availableServices.find(s => s.id === selectedServiceId)
    if (!service) return

    setSelectedServices(prev => {
      const existing = prev.find(item => item.service.id === service.id)
      if (existing) {
        return prev.map(item =>
          item.service.id === service.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { service, quantity }]
    })
  }

  const removeService = (serviceId: number) => {
    setSelectedServices(prev => prev.filter(item => item.service.id !== serviceId))
  }

  return (
    <div className="project-builder" style={{ maxWidth: 700, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2>Состав проекта</h2>

      <AddServiceForm
        selectedServiceId={selectedServiceId}
        quantity={quantity}
        onServiceChange={setSelectedServiceId}
        onQuantityChange={setQuantity}
        onAdd={addService}
      />

      <ServicesTable
        items={selectedServices}
        totalPrice={totalPrice}
        onRemove={removeService}
      />
    </div>
  )
}
