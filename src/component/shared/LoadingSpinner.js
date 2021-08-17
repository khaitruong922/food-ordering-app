import { Flex, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
    return (
        <Flex align='center' justify='center' height='100%'>
            <Spinner color='yellow.500' size='lg' />
        </Flex>
    )
}