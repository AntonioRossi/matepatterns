import { useCallback, useEffect, useState } from 'react';
import { InputNumber, List, Col, Row, Form, Switch } from 'antd';

const BinaryList = () => {
  const [inputLength, setInputLength] = useState<number | undefined>();
  const [maxDuplicateOccurrences, setMaxDuplicateOccurrences] = useState<number | undefined>();
  const [binaryList, setBinaryList] = useState<string[]>([]);
  const [filteredBinaryList, setFilteredBinaryList] = useState<string[]>([]);
  const [isExactMatch, setIsExactMatch] = useState(false);

  const generateBinaryList = useCallback((length: number, maxOccurrences: number) => {
    const totalNumbers = Math.pow(2, length);
    const list: string[] = [];
    const filteredList: string[] = [];

    for (let i = 0; i < totalNumbers; i++) {
      const binaryStr = i.toString(2).padStart(length, '0');
      list.push(binaryStr);

      const oneCount = (binaryStr.match(/1/g) || []).length; // Count occurrences of '1' in binaryStr

      if (isExactMatch) {
        if (oneCount === maxOccurrences) {
          filteredList.push(binaryStr);
        }
      } else {
        if (oneCount <= maxOccurrences) {
          filteredList.push(binaryStr);
        }
      }
    }

    setBinaryList(list);
    setFilteredBinaryList(filteredList);
  }, [isExactMatch]) as (length: number, maxOccurrences: number) => void;

  useEffect(() => {
    if (inputLength !== undefined && maxDuplicateOccurrences !== undefined) {
      generateBinaryList(inputLength, maxDuplicateOccurrences);
    }
  }, [isExactMatch, generateBinaryList, inputLength, maxDuplicateOccurrences]);

  const handleInputChange = (newInputLength?: number, newMaxOccurrences?: number) => {
    const finalInputLength = newInputLength !== undefined ? newInputLength : inputLength;
    const finalMaxOccurrences = newMaxOccurrences !== undefined ? newMaxOccurrences : maxDuplicateOccurrences;

    if (finalInputLength !== undefined && finalMaxOccurrences !== undefined) {
      setInputLength(finalInputLength);
      setMaxDuplicateOccurrences(finalMaxOccurrences);
      generateBinaryList(finalInputLength, finalMaxOccurrences);
    } else {
      if (newInputLength !== undefined) {
        setInputLength(newInputLength);
      }
      if (newMaxOccurrences !== undefined) {
        setMaxDuplicateOccurrences(newMaxOccurrences);
      }
      setBinaryList([]);
      setFilteredBinaryList([]);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Form>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Exact Match">
              <Switch checked={isExactMatch} onChange={value => setIsExactMatch(value)} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Enter binary string length">
              <InputNumber
                min={1}
                max={16}
                value={inputLength}
                onChange={(value) => handleInputChange(value !== null ? value : undefined, maxDuplicateOccurrences)}
                placeholder="Enter the length of the binary string"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={isExactMatch ? "Exact ones occurrences" : "Max ones occurrences"}>
              <InputNumber
                min={1}
                value={maxDuplicateOccurrences}
                onChange={(value) => handleInputChange(inputLength, value !== null ? value : undefined)}
                placeholder="Enter max ones occurrences for strings"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Row gutter={16}>
        <Col span={12}>
          <List
            header={
              <div>
                Binary List
                <span style={{ marginLeft: '10px', color: 'gray' }}>
                  ({binaryList.length})
                </span>
              </div>
            }
            bordered
            dataSource={binaryList}
            renderItem={item => (
              <List.Item>{item}</List.Item>
            )}
          />
        </Col>

        <Col span={12}>
          <List
            header={
              <div>
                Filtered List
                <span style={{ marginLeft: '10px', color: 'gray' }}>
                  ({filteredBinaryList.length})
                </span>
              </div>
            }
            bordered
            dataSource={filteredBinaryList}
            renderItem={item => (
              <List.Item>{item}</List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
}

export default BinaryList;
