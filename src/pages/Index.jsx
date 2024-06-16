import { useState, useEffect } from "react";
import { Container, VStack, Input, Button, Text, Box, Spinner } from "@chakra-ui/react";
import Confetti from "react-confetti";

const Index = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const checkOrderStatus = async () => {
    setLoading(true);
    setError(null);
    setOrderStatus(null);
    setShowConfetti(false);

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Mock response
      const mockResponse = {
        status: "In Transit",
        estimatedDelivery: "2023-10-15",
      };
      setOrderStatus(mockResponse);
      setShowConfetti(true);
    } catch (err) {
      setError("Failed to fetch order status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Order Status Checker</Text>
        <Input
          placeholder="Enter your order number"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          size="lg"
        />
        <Button onClick={checkOrderStatus} colorScheme="blue" size="lg" isFullWidth>
          Check Status
        </Button>
        {loading && <Spinner size="xl" />}
        {error && <Text color="red.500">{error}</Text>}
        {orderStatus && (
          <Box p={4} borderWidth={1} borderRadius="md" width="100%">
            <Text>Status: {orderStatus.status}</Text>
            <Text>Estimated Delivery: {orderStatus.estimatedDelivery}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;