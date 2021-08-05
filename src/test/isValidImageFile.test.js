import isValidImageFile from "../util/isValidImageFile"

describe('isValidImageFile', () => {
    it('should accept image file', () => {
        expect(isValidImageFile({ type: 'image/png', size: 1024 * 1024 }).valid).toEqual(true)
    })
    it('should not accept non-image file', () => {
        expect(isValidImageFile({ type: 'pdf', size: 1024 * 1024 }).valid).toEqual(false)
    })

    it('should not accept file larger than 1 MB', () => {
        expect(isValidImageFile({ type: 'image/png', size: 1024 * 1024 + 1 }).valid).toEqual(false)
    })
})