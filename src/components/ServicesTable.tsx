import type { ServiceItem } from '../types';

const cellStyle = { border: '1px solid #ddd', padding: 10 }
const thStyle = { ...cellStyle, textAlign: 'left' as const }

interface IServicesTableProps {
  items: ServiceItem[]
  totalPrice: number
  onRemove: (serviceId: number) => void
}

export const ServicesTable = ({ items, totalPrice, onRemove }: IServicesTableProps) => {

  if (items.length === 0) {
    return (
      <p style={{ color: '#888', fontStyle: 'italic' }}>
        Пока не добавлено ни одной услуги
      </p>
    )
  }

  return (
    <table className="services-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={thStyle}>Услуга</th>
          <th style={thStyle}>Цена за ед.</th>
          <th style={thStyle}>Кол-во</th>
          <th style={thStyle}>Сумма</th>
          <th style={thStyle}></th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.service.id}>
            <td style={cellStyle}>{item.service.name}</td>
            <td style={cellStyle}>{item.service.price.toLocaleString()} ₽</td>
            <td style={cellStyle}>{item.quantity}</td>
            <td style={cellStyle}>
              {(item.service.price * item.quantity).toLocaleString()} ₽
            </td>
            <td style={cellStyle}>
              <button onClick={() => onRemove(item.service.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={3} style={cellStyle}>
            <strong>Итого:</strong>
          </td>
          <td colSpan={2} style={cellStyle}>
            <strong>{totalPrice.toLocaleString()} ₽</strong>
          </td>
        </tr>
      </tfoot>
    </table>
  )
};
