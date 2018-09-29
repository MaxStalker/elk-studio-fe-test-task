import { buildQuery, massageRoundsData } from './index'

describe('Test Utilities - Build Query', () => {
  it('Shall build query for empty string', () => {
    const query = buildQuery({})
    expect(query).toEqual('')
  })

  it('Shall build query for single argument', () => {
    const query = buildQuery({ accountId: 60137 })
    expect(query).toEqual('?accountId=60137')
  })
  it('Shall build query for multiple argument', () => {
    const query = buildQuery({
      accountId: 60137,
      dateFrom: '2018-08-16T00:30:10Z',
      operatorId: 7,
    })
    expect(query).toEqual(
      '?accountId=60137&dateFrom=2018-08-16T00:30:10Z&operatorId=7'
    )
  })
})

describe('Test Utilities - Massage Round Data', () => {
  it('Shall return empty list and empty hash table', () => {
    const data = []
    const massagedData = massageRoundsData(data)
    expect(massagedData.byId).toEqual({})
    expect(massagedData.list.length).toEqual(0)
  })
  it('Shall return list and hash tabl with one element', () => {
    const data = [
      {
        id: 'test',
        status: 'passed',
      },
    ]
    const massagedData = massageRoundsData(data)
    expect(massagedData.byId['test'].status).toEqual('passed')
    expect(massagedData.list.length).toEqual(1)
    expect(massagedData.list[0]).toEqual('test')
  })
})
