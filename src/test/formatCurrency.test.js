import formatCurrency from '../../src/util/formatCurrency'
describe('formatCurrency', () => {
    it('should return correct result for numbers', () => {
        expect(formatCurrency(2)).toEqual('$2.00')
        expect(formatCurrency(2.5)).toEqual('$2.50')
        expect(formatCurrency(2.809)).toEqual('$2.81')
    })
    it('should return $0.00 for NaN', () => {
        expect(formatCurrency('a')).toEqual('$0.00')
        expect(formatCurrency(null)).toEqual('$0.00')
        expect(formatCurrency(undefined)).toEqual('$0.00')
        expect(formatCurrency(NaN)).toEqual('$0.00')
    })
})