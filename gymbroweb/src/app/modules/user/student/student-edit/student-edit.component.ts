import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentInput } from 'src/app/shared/models/student/studentInput';
import { StudentService } from 'src/app/shared/services/student.service';
import { onlyLettersValidator } from 'src/app/shared/validators/lettersValidator';
import { onlyNumbersValidator } from 'src/app/shared/validators/numberValidator';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css'],
})
export class StudentEditComponent implements OnInit {
  studentId: number = 0;
  studentInputFormUpdate!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.studentInputFormUpdate = this.formBuilder.group({
      name: ['', [Validators.required, onlyLettersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      lastName: ['', [Validators.required, onlyLettersValidator()]],
      phone: [
        '',
        [Validators.required, onlyNumbersValidator(), Validators.maxLength(15)],
      ],
      personalId: [
        '',
        [Validators.required, onlyNumbersValidator(), Validators.maxLength(15)],
      ],
    });
  }

  ngOnInit() {
    this.getStudentId();
  }

  getStudentId() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentId = id !== null ? +id : 0;

    if (this.studentId) {
      this.studentService
        .findById(this.studentId)
        .subscribe((student: StudentInput) => {
          if (student) {
            this.studentInputFormUpdate.patchValue(student);
          }
        });
    }
    console.log('studante id tela edit studante', this.studentId);
  }

  updateStudent() {
    if (this.studentInputFormUpdate.valid) {
      const student: StudentInput = {
        ...this.studentInputFormUpdate.value,
        id: this.studentId,
      };

      this.studentService.update(this.studentId, student).subscribe(
        (response) => {
          console.log(response);
          this.messageService.add({
            severity: 'success',
            summary: 'Atualização',
            detail: 'Estudante atualizado com sucesso!',
          });
          console.log('deu certo');
          // this.router.navigate(['/students']); // Altere o caminho conforme necessário
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar estudante.',
          });
        }
      );
      setTimeout(() => {
        this.location.back();
      }, 3000);
    }
  }
  cancelAndClearForm() {
    // this.studentInputFormUpdate.reset();
    this.location.back();
    //this.router.navigate(['/students']); // Altere o caminho conforme necessário
  }
}
