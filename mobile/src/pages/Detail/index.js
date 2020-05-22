import React from 'react';
import { Feather} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const order = route.params.order;
  const message = `Olá ${order.name}, estou entrando em contato pois gostaria de te ajudar no pedido ${order.title}! `;

  function navigateBack() {
    navigation.goBack()
  } 

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Help: ${order.title}`,
      recipients: [order.email],
      body: message
    })
  }

  function sendWhatsapp() {
    Linking.openURL(`whatsapp://send?phone=${order.whatsapp}&text=${message}`);
  }
  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#451269" />
        </TouchableOpacity>
      </View>

      <View style={styles.order}>
        <Text style={[styles.orderProperty, { marginTop: 0 }]}>NOME: </Text>
        <Text style={styles.orderValue}>{order.name} </Text>
            
        <Text style={styles.orderProperty}>PEDIDO: </Text>
        <Text style={styles.orderValue}>{order.title} </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.covidTitle}>Ajude uma pessoa! </Text>
        <Text style={styles.covidTitle}>Solidarize-se </Text>
      
        <Text style={styles.covidDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.action, styles.whatsapp]} onPress={sendWhatsapp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.action, styles.email]} onPress={sendMail}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}