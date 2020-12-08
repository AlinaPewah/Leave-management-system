<template>

        <v-row justify="center">
            <v-col cols="10" sm="10" md="7">
                     Applications
            </v-col>
            <v-col v-for="n in 6" :key="n" cols="10" sm="10" md="7">
                     <v-card
                     height="75px"
                     width="100%"
                     color="secondary">
                         </v-card>
            </v-col>
        </v-row>

</template>
