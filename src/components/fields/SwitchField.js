// Chakra imports
import {
  Box,
  Flex,
  FormLabel,
  Switch,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import React from 'react';

export default function Default(props) {
  const {
    id,
    label,
    isChecked,
    onChange,
    desc,
    textWidth,
    reversed,
    fontSize,
    spacing,
    defaultChecked,
    ...rest
  } = props;
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Box w="100%" fontWeight="500" {...rest}>
      {reversed ? (
        <Flex align="center" borderRadius="16px">
          {isChecked && onChange ? (
            <Switch
            isChecked={isChecked}
            id={id}
            colorScheme="brand"
            size="md"
            onChange={onChange}
            spacing={spacing}
            defaultChecked={defaultChecked}
            />
          ) : (
              <Switch id={id} colorScheme="brand" size="md" spacing={spacing} defaultChecked={defaultChecked}  />
          )}
          <FormLabel
            ms="15px"
            htmlFor={id}
            _hover={{ cursor: 'pointer' }}
            direction="column"
            mb="0px"
            maxW={textWidth ? textWidth : '75%'}
          >
            <Text color={textColorPrimary} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={fontSize ? fontSize : 'md'}
            >
              {desc}
            </Text>
          </FormLabel>
        </Flex>
      ) : (
        <Flex justify="space-between" align="center" borderRadius="16px">
          <FormLabel
            htmlFor={id}
            _hover={{ cursor: 'pointer' }}
            direction="column"
            maxW={textWidth ? textWidth : '75%'}
          >
            <Text color={textColorPrimary} fontSize="md" fontWeight="500">
              {label}
            </Text>
            <Text
              color="secondaryGray.600"
              fontSize={fontSize ? fontSize : 'md'}
            >
              {desc}
            </Text>
          </FormLabel>
          {isChecked && onChange ? (
            <Switch
              isChecked={isChecked}
              id={id}
              colorScheme="brand"
              size="md"
              onChange={onChange}
              spacing={spacing}
              defaultChecked={defaultChecked}
            />
          ) : (
          <Switch id={id} colorScheme="brand" size="md" spacing={spacing} isChecked={isChecked} />
          )}
        </Flex>
      )}
    </Box>
  );
}
