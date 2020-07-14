import React, { useEffect } from 'react';
// Redux
import { useSelector } from 'react-redux';
// CSS
import classes from './Success.module.scss';
// Components
import { MyHeader } from '../../StyledUI/MyHeader';
import { Label } from '../../StyledUI/Label';
import { Attribute } from '../../StyledUI/Attribute';
import { Spacer } from '../../StyledUI/Spacer';
import { MyCard } from '../../StyledUI/MyCard';

interface SuccessProps {}

export const Success: React.FC<SuccessProps> = ({}) => {
  const orderData = useSelector((state: any) => state.order.orderData);
  const cartData = useSelector((state: any) => state.cart.cartItems);

  useEffect(() => {
    console.log({ orderData, cartData });
  }, []);

  return (
    <div className={classes.Success}>
      <Spacer>
        <MyHeader primary>Thank you for your order!</MyHeader>
      </Spacer>
      <div className={classes.Success__description}>
        <div className={classes.Success__address}>
          <Spacer>
            <MyHeader secondary>Billing Information</MyHeader>
          </Spacer>
          <Spacer>
            <Label>Billing Name:</Label>
            <Attribute>{orderData.billingName}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Billing Address:</Label>
            <Attribute>{orderData.billingAddress}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Billing City:</Label>
            <Attribute>{orderData.billingCity}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Billing State:</Label>
            <Attribute>{orderData.billingState}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Billing Zip:</Label>
            <Attribute>{orderData.billingZip}</Attribute>
          </Spacer>
        </div>
        <div className={classes.Success__address}>
          <Spacer>
            <MyHeader secondary>Shipping Information</MyHeader>
          </Spacer>
          <Spacer>
            <Label>Shipping Name:</Label>
            <Attribute>{orderData.shippingName}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Shipping Address:</Label>
            <Attribute>{orderData.billingAddress}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Shipping City:</Label>
            <Attribute>{orderData.shippingCity}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Shipping State:</Label>
            <Attribute>{orderData.shippingState}</Attribute>
          </Spacer>
          <Spacer>
            <Label>Shipping Zip:</Label>
            <Attribute>{orderData.shippingZip}</Attribute>
          </Spacer>
        </div>
      </div>
    </div>
  );
};
