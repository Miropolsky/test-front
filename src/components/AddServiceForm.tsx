import { availableServices } from '../data/availableServices'

interface IAddServiceFormProps {
  selectedServiceId: number | ''
  quantity: number
  onServiceChange: (id: number) => void
  onQuantityChange: (value: number) => void
  onAdd: () => void
}

export const AddServiceForm = ({
  selectedServiceId,
  quantity,
  onServiceChange,
  onQuantityChange,
  onAdd,
}: IAddServiceFormProps) => {
  return (
    <div className="add-service" style={{ display: 'flex', gap: 12, marginBottom: 24, alignItems: 'center' }}>
      <select
        value={selectedServiceId}
        onChange={e => onServiceChange(Number(e.target.value))}
      >
        <option value="" disabled>Выберите услугу</option>
        {availableServices.map(service => (
          <option key={service.id} value={service.id}>
            {service.name} — {service.price.toLocaleString()} ₽
          </option>
        ))}
      </select>

      <input
        type="number"
        min={1}
        max={10}
        value={quantity}
        onChange={e => onQuantityChange(Number(e.target.value))}
        style={{ width: 80, padding: '8px 12px' }}
      />

      <button onClick={onAdd} disabled={!selectedServiceId}>
        Добавить
      </button>
    </div>
  )
};
