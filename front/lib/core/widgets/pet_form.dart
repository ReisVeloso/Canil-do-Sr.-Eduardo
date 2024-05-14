import 'package:date_field/date_field.dart';
import 'package:flutter/material.dart';

import 'package:canil_eduardo/core/utils/fonts.dart';
import 'package:canil_eduardo/core/widgets/pet_text_filed.dart';
import 'package:canil_eduardo/home/controller/home_controller.dart';

class PetForm extends StatefulWidget {
  const PetForm({
    super.key,
    required this.controller,
  });

  final HomeController controller;

  @override
  State<PetForm> createState() => _PetFormState();
}

class _PetFormState extends State<PetForm> {
  String nSmall = '';
  String nBig = '';
  DateTime date = DateTime.now();

  List<bool> enable = [false, false, false];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text(
          'Quantidade de Cães',
          style: Fonts.body22Medium,
        ),
        const SizedBox(
          height: 16,
        ),
        Row(
          children: [
            Flexible(
              child: Column(
                children: [
                  const Text(
                    'Pequenos',
                    style: Fonts.body16Regular,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  PetTextFiled(
                    onChanged: (value) {
                      setState(() {
                        if (value.isEmpty) {
                          enable[0] = false;
                          return;
                        }

                        enable[0] = true;
                        nSmall = value;
                      });
                    },
                  ),
                ],
              ),
            ),
            const SizedBox(
              width: 8,
            ),
            Flexible(
              child: Column(
                children: [
                  const Text(
                    'Grandes',
                    style: Fonts.body16Regular,
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  PetTextFiled(
                    onChanged: (value) {
                      setState(() {
                        if (value.isEmpty) {
                          enable[1] = false;
                          return;
                        }

                        enable[1] = true;
                        nBig = value;
                      });
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(
          height: 16,
        ),
        const Text(
          'Data',
          style: Fonts.body22Medium,
        ),
        const SizedBox(
          height: 8,
        ),
        DateTimeFormField(
          decoration: InputDecoration(
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(300),
              borderSide: BorderSide.none,
            ),
            isCollapsed: true,
            contentPadding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 8,
            ),
            filled: true,
          ),
          initialPickerDateTime: DateTime.now(),
          mode: DateTimeFieldPickerMode.date,
          onChanged: (DateTime? value) {
            setState(() {
              if (value == null) {
                enable[2] = false;
                return;
              }

              enable[2] = true;

              date = value;
            });
          },
        ),
        const SizedBox(
          height: 16,
        ),
        ElevatedButton(
          onPressed: enable.every((enabled) => enabled)
              ? () => widget.controller.calcular(
                    date: date,
                    nBig: nBig,
                    nSmall: nSmall,
                  )
              : null,
          child: const Text(
            'CALCULAR',
            style: Fonts.body22Medium,
          ),
        ),
      ],
    );
  }
}
